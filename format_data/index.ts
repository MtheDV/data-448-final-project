import * as path from 'path';
import * as fs from 'fs';
import {parse} from 'csv-parse';

type FormattedDataValue = string | number | boolean | Array<string | number | FormattedDataType> | FormattedDataType;
type FormattedDataType = { [index: string]: FormattedDataValue };
type FormattedData = Array<FormattedDataType>;
type IncludedDataType = {
  source?: FormattedData,
  idMatch?: string,
  column: string,
  parse?: ((input: string) => string) | ((input: FormattedDataType) => FormattedDataValue),
  type?: 'string' | 'number',
  value?: FormattedDataValue
};
type DataTypes = { [index: string]: IncludedDataType };

type TransformSplit = {
  type: 'split',
  values: Array<string>,
  to: string
}
type TransformSplitWith = {
  type: 'split-with',
  values: Array<Array<string>>,
  to: Array<string>
}
type TransformInsertInto = {
  type: 'insert-into',
  to: string,
  on: { parentVal: string, withVal: string },
  with: FormattedData
}
type TransformOn = TransformSplit | TransformSplitWith | TransformInsertInto
type TransformOptions = {
  removeEmpty?: boolean,
  addIncrementingId?: boolean,
  removeOnValue?: boolean
}

const formatData = async (csvInputFile: string, dataFormatHeaders: DataTypes, startPos?: number, endPos?: number): Promise<FormattedData> => {
  const formattedData: FormattedData = [];
  
  const parser = fs
    .createReadStream(path.resolve(__dirname, `input/${csvInputFile}`))
    .pipe(parse({
      delimiter: ',',
      columns: true,
      from: startPos ?? 1,
      to: endPos
    }));
  for await (const record of parser) {
    const newData: FormattedDataType = {
      id: formattedData.length + 1
    };
    Object.entries(dataFormatHeaders).forEach(([header, dataIndex]) => {
      if (dataIndex.value) {
        newData[header] = dataIndex.value;
        return;
      }
      let value = dataIndex.source?.find(data => data[dataIndex.idMatch ?? 'id'] === record[dataIndex.column]) ?? record[dataIndex.column];
      if (dataIndex.type === 'number') value = Number(value);
      if (dataIndex.parse) value = dataIndex.parse(value);
      newData[header] = value;
    });
    formattedData.push(newData);
  }
  return formattedData;
};

const transformFormattedData = (formattedData: FormattedData, transformOn: TransformOn, holdValues: Array<string>, options: TransformOptions): FormattedData => {
  return formattedData.reduce((previousValue: FormattedData, currentValue: FormattedDataType) => {
    if (transformOn.type === 'split') {
      const transformedValues: Array<FormattedDataType> = [];
      transformOn.values.forEach(value => {
        if (options.removeEmpty && (!currentValue[value] || currentValue[value] === '')) return;
        const transformKeep: FormattedDataType = {};
        if (options.addIncrementingId) transformKeep.id = previousValue.length + transformedValues.length + 1;
        holdValues?.forEach(hold => transformKeep[hold] = currentValue[hold]);
        transformKeep[transformOn.to] = currentValue[value];
        transformedValues.push(transformKeep);
      });
      return [...previousValue, ...transformedValues];
    }
    if (transformOn.type === 'split-with') {
      const transformedValues: Array<FormattedDataType> = [];
      transformOn.values.forEach(values => {
        const transformKeep: FormattedDataType = {};
        if (options.addIncrementingId) transformKeep.id = previousValue.length + transformedValues.length + 1;
        holdValues?.forEach(hold => transformKeep[hold] = currentValue[hold]);
        values.forEach((value, index) => {
          if (options.removeEmpty && (currentValue[value] === null || currentValue[value] === '')) return;
          transformKeep[transformOn.to[index]] = currentValue[value];
        });
        transformedValues.push(transformKeep);
      });
      return [...previousValue, ...transformedValues];
    }
    if (transformOn.type === 'insert-into') {
      const insertableValues: FormattedData = [];
      transformOn.with.forEach(insertData => {
        if (currentValue[transformOn.on.parentVal] === insertData[transformOn.on.withVal]) {
          if (options.removeOnValue) delete insertData[transformOn.on.withVal];
          insertableValues.push(insertData);
        }
      });
      currentValue[transformOn.to] = insertableValues;
    }
    
    return [...previousValue, currentValue];
  }, []);
};

const writeData = (jsonOutputFile: string, data: FormattedData) => {
  const jsonStringData = JSON.stringify(data, null, 2);
  fs.writeFile(path.resolve(__dirname, `output/${jsonOutputFile}`), jsonStringData, err => {
    console.error(err);
  });
};

/**
 * DATA FORMATTING STARTS HERE:
 */
(async () => {
  const studentData = await formatData('overall-peers.csv', {
    id: {
      column: 'ID',
      type: 'number'
    },
    name: {
      column: 'Student',
      parse: (input: string) => {
        const nameSplit = input.split(', ');
        return `${nameSplit[1]} ${nameSplit[0]}`;
      }
    },
    studentId: {
      column: 'SIS User ID'
    }
  }, 3);
  const teamsData = await formatData('341-teams-data.csv', {
    id: {
      column: 'Team ID',
      type: 'number'
    },
    name: {
      column: 'Team'
    },
    teamSetId: {
      column: 'Team Set ID',
      type: 'number'
    }
  });
  const teamMembersData = await formatData('341-teams-data.csv', {
    teamId: {
      column: 'Team ID',
      type: 'number'
    },
    teamSetId: {
      column: 'Team Set ID',
      type: 'number'
    },
    member1: {
      source: studentData,
      idMatch: 'name',
      column: 'Member 1',
      parse: (input: FormattedDataType) => {
        return input['id'];
      }
    },
    member2: {
      source: studentData,
      idMatch: 'name',
      column: 'Member 2',
      parse: (input: FormattedDataType) => {
        return input['id'];
      }
    },
    member3: {
      source: studentData,
      idMatch: 'name',
      column: 'Member 3',
      parse: (input: FormattedDataType) => {
        return input['id'];
      }
    },
    member4: {
      source: studentData,
      idMatch: 'name',
      column: 'Member 4',
      parse: (input: FormattedDataType) => {
        return input['id'];
      }
    },
    member5: {
      source: studentData,
      idMatch: 'name',
      column: 'Member 5',
      parse: (input: FormattedDataType) => {
        return input['id'];
      }
    }
  });
  const teamEnrollmentsData = transformFormattedData(teamMembersData, {
    type: 'split',
    values: ['member1', 'member2', 'member3', 'member4', 'member5'],
    to: 'studentId'
  }, ['teamId', 'teamSetId'], {
    removeEmpty: true,
    addIncrementingId: true
  });
  writeData('teamEnrollments.json', teamEnrollmentsData);
  const studentsEnrollmentsData = transformFormattedData(studentData, {
    type: 'insert-into',
    to: 'enrollments',
    on: {
      parentVal: 'id',
      withVal: 'studentId'
    },
    with: teamEnrollmentsData
  }, [], {});
  writeData('students.json', studentsEnrollmentsData);
  const teamsEnrollmentsData = transformFormattedData(teamsData, {
    type: 'insert-into',
    to: 'enrollments',
    on: {
      parentVal: 'id',
      withVal: 'teamId'
    },
    with: teamEnrollmentsData
  }, [], {});
  writeData('teams.json', teamsEnrollmentsData);
  const fullAssignmentsData = await formatData('overall-peers.csv', {
    main1: {
      column: 'Main Activity for Module 1 (741775)',
      type: 'number'
    },
    main1Name: {
      column: '',
      value: 'Main Activity for Module 1'
    },
    main2: {
      column: 'Main Activity for Module 2 (749660)',
      type: 'number'
    },
    main2Name: {
      column: '',
      value: 'Main Activity for Module 2'
    },
    main3: {
      column: 'Main Activity for Module 3 (749880)',
      type: 'number'
    },
    main3Name: {
      column: '',
      value: 'Main Activity for Module 3'
    },
    main4: {
      column: 'Main Activity for Module 4 (749896)',
      type: 'number'
    },
    main4Name: {
      column: '',
      value: 'Main Activity for Module 4'
    },
    main5: {
      column: 'Main Activity for Module 5 (815722)',
      type: 'number'
    },
    main5Name: {
      column: '',
      value: 'Main Activity for Module 5'
    },
    main6: {
      column: 'Main Activity for Module 6 (823394)',
      type: 'number'
    },
    main6Name: {
      column: '',
      value: 'Main Activity for Module 6'
    },
    main7: {
      column: 'Main Activity for Module 7 (839861)',
      type: 'number'
    },
    main7Name: {
      column: '',
      value: 'Main Activity for Module 7'
    },
    main8: {
      column: 'Main Activity for Module 8 (850715)',
      type: 'number'
    },
    main8Name: {
      column: '',
      value: 'Main Activity for Module 8'
    },
    main9: {
      column: 'Main Activity for Module 9 (852281)',
      type: 'number'
    },
    main9Name: {
      column: '',
      value: 'Main Activity for Module 9'
    },
    main9Optional: {
      column: '',
      value: true
    },
    main10: {
      column: 'Main Activity for Module 10 (852284)',
      type: 'number'
    },
    main10Name: {
      column: '',
      value: 'Main Activity for Module 10'
    },
    main10Optional: {
      column: '',
      value: true
    },
    main11: {
      column: 'Main Activity for Module 11 (851912)',
      type: 'number'
    },
    main11Name: {
      column: '',
      value: 'Main Activity for Module 11'
    },
    main11Optional: {
      column: '',
      value: true
    }
  }, 2, 2);
  const assignmentsData = transformFormattedData(fullAssignmentsData, {
    type: 'split-with',
    values: [['main1', 'main1Name'], ['main2', 'main2Name'], ['main3', 'main3Name'], ['main4', 'main4Name'], ['main5', 'main5Name'], ['main6', 'main6Name'], ['main7', 'main7Name'], ['main8', 'main8Name'], ['main9', 'main9Name', 'main9Optional'], ['main10', 'main10Name', 'main10Optional'], ['main11', 'main11Name', 'main11Optional']],
    to: ['grade', 'name', 'optional']
  }, [], {
    removeEmpty: true,
    addIncrementingId: true
  });
  const fullSubmissionsData = await formatData('overall-peers.csv', {
    studentId: {
      column: 'ID',
      type: 'number'
    },
    main1: {
      column: 'Main Activity for Module 1 (741775)',
      type: 'number'
    },
    main1Name: {
      column: '',
      value: 'Main Activity for Module 1'
    },
    main2: {
      column: 'Main Activity for Module 2 (749660)',
      type: 'number'
    },
    main2Name: {
      column: '',
      value: 'Main Activity for Module 2'
    },
    main3: {
      column: 'Main Activity for Module 3 (749880)',
      type: 'number'
    },
    main3Name: {
      column: '',
      value: 'Main Activity for Module 3'
    },
    main4: {
      column: 'Main Activity for Module 4 (749896)',
      type: 'number'
    },
    main4Name: {
      column: '',
      value: 'Main Activity for Module 4'
    },
    main5: {
      column: 'Main Activity for Module 5 (815722)',
      type: 'number'
    },
    main5Name: {
      column: '',
      value: 'Main Activity for Module 5'
    },
    main6: {
      column: 'Main Activity for Module 6 (823394)',
      type: 'number'
    },
    main6Name: {
      column: '',
      value: 'Main Activity for Module 6'
    },
    main7: {
      column: 'Main Activity for Module 7 (839861)',
      type: 'number'
    },
    main7Name: {
      column: '',
      value: 'Main Activity for Module 7'
    },
    main8: {
      column: 'Main Activity for Module 8 (850715)',
      type: 'number'
    },
    main8Name: {
      column: '',
      value: 'Main Activity for Module 8'
    },
    main9: {
      column: 'Main Activity for Module 9 (852281)',
      type: 'number'
    },
    main9Name: {
      column: '',
      value: 'Main Activity for Module 9'
    },
    main9Optional: {
      column: '',
      value: true
    },
    main10: {
      column: 'Main Activity for Module 10 (852284)',
      type: 'number'
    },
    main10Name: {
      column: '',
      value: 'Main Activity for Module 10'
    },
    main10Optional: {
      column: '',
      value: true
    },
    main11: {
      column: 'Main Activity for Module 11 (851912)',
      type: 'number'
    },
    main11Name: {
      column: '',
      value: 'Main Activity for Module 11'
    },
    main11Optional: {
      column: '',
      value: true
    }
  }, 3);
  const submissionsData = transformFormattedData(fullSubmissionsData, {
    type: 'split-with',
    values: [['main1', 'main1Name'], ['main2', 'main2Name'], ['main3', 'main3Name'], ['main4', 'main4Name'], ['main5', 'main5Name'], ['main6', 'main6Name'], ['main7', 'main7Name'], ['main8', 'main8Name'], ['main9', 'main9Name', 'main9Optional'], ['main10', 'main10Name', 'main10Optional'], ['main11', 'main11Name', 'main11Optional']],
    to: ['grade', 'name', 'optional']
  }, ['studentId'], {
    removeEmpty: true,
    addIncrementingId: true
  });
  const completeAssignmentsData = transformFormattedData(assignmentsData, {
    type: 'insert-into',
    to: 'submissions',
    on: {
      parentVal: 'name',
      withVal: 'name'
    },
    with: submissionsData
  }, [], {
    removeOnValue: true
  });
  writeData('assignments.json', completeAssignmentsData);
  writeData('submissions.json', submissionsData);
})();
