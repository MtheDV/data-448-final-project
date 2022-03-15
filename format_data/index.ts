import * as path from 'path';
import * as fs from 'fs';
import {parse} from 'csv-parse';

type FormattedDataType = { [index: string]: string | number | Array<string | number> | FormattedDataType };
type FormattedData = Array<FormattedDataType>;
type IncludedDataType = {
  source?: FormattedData,
  idMatch?: string,
  index: string,
  parse?: (input: string) => string
};
type DataTypes = { [index: string]: IncludedDataType };

type TransformSplit = {
  type: 'split',
  values: Array<string>,
  to: string
}
type TransformOn = TransformSplit
type TransformOptions = {
  removeEmpty?: boolean,
  addIncrementingId?: boolean
}

const formatData = async (csvInputFile: string, dataFormatHeaders: DataTypes, startPos?: number): Promise<FormattedData> => {
  const formattedData: FormattedData = [];
  
  const parser = fs
    .createReadStream(path.resolve(__dirname, `input/${csvInputFile}`))
    .pipe(parse({
      delimiter: ',',
      columns: true,
      from: startPos ?? 1
    }));
  for await (const record of parser) {
    const newData: FormattedDataType = {
      id: formattedData.length + 1
    };
    Object.entries(dataFormatHeaders).forEach(([header, dataIndex]) => {
      let value = dataIndex.source?.find(data => data[dataIndex.idMatch ?? 'id'] === record[header]) ?? record[header];
      if (dataIndex.parse) {
        value = dataIndex.parse(value);
      }
      newData[dataIndex.index] = value;
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
        if (options.removeEmpty && (currentValue[value] === null || currentValue[value] === '')) return;
        const transformKeep: FormattedDataType = {};
        if (options.addIncrementingId) transformKeep.id = previousValue.length + transformedValues.length + 1;
        holdValues?.forEach(hold => transformKeep[hold] = currentValue[hold]);
        transformKeep[transformOn.to] = currentValue[value];
        transformedValues.push(transformKeep);
      });
      return [...previousValue, ...transformedValues];
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

(async () => {
  const studentData = await formatData('overall-peers.csv', {
    'ID': {
      index: 'id'
    },
    'Student': {
      index: 'name',
      parse: (input) => {
        const nameSplit = input.split(', ');
        return `${nameSplit[1]} ${nameSplit[0]}`;
      }
    },
    'SIS User ID': {
      index: 'studentId'
    }
  }, 3);
  writeData('students.json', studentData);
  const teamsData = await formatData('341-teams-data.csv', {
    'Team ID': {
      index: 'id'
    },
    'Team': {
      index: 'name'
    },
    'Team Set ID': {
      index: 'teamSetId'
    }
  });
  writeData('teams.json', teamsData);
  const teamMembersData = await formatData('341-teams-data.csv', {
    'Team ID': {
      index: 'teamId'
    },
    'Member 1': {
      source: studentData,
      idMatch: 'name',
      index: 'member1'
    },
    'Member 2': {
      source: studentData,
      idMatch: 'name',
      index: 'member2'
    },
    'Member 3': {
      source: studentData,
      idMatch: 'name',
      index: 'member3'
    },
    'Member 4': {
      source: studentData,
      idMatch: 'name',
      index: 'member4'
    },
    'Member 5': {
      source: studentData,
      idMatch: 'name',
      index: 'member5'
    }
  });
  writeData('teamMembers.json', teamMembersData);
  const teamEnrollmentsData = transformFormattedData(teamMembersData, {
    type: 'split',
    values: ['member1', 'member2', 'member3', 'member4', 'member5'],
    to: 'student'
  }, ['teamId'], {
    removeEmpty: true,
    addIncrementingId: true
  });
  writeData('teamEnrollments.json', teamEnrollmentsData);
})();
