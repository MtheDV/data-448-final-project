import * as path from 'path';
import * as fs from 'fs';
import {parse} from 'csv-parse';

const formatData = async (csvInputFile: string, dataFormat: { [index: string]: string }, startPos?: number): Promise<Array<{ [index: string]: string | number }>> => {
  const formattedData: Array<{ [index: string]: string | number }> = [];
  
  const parser = fs
    .createReadStream(path.resolve(__dirname, `input/${csvInputFile}`))
    .pipe(parse({
      delimiter: ',',
      columns: true,
      from: startPos ?? 1
    }));
  for await (const record of parser) {
    const newData: { [index: string]: string | number } = {
      id: formattedData.length
    };
    Object.entries(dataFormat).forEach(([header, dataIndex]) => {
      newData[dataIndex] = record[header];
    });
    formattedData.push(newData);
  }
  return formattedData;
};

const writeData = (jsonOutputFile: string, data: Array<{ [index: string]: string | number }>) => {
  const jsonStringData = JSON.stringify(data, null, '\t');
  fs.writeFile(path.resolve(__dirname, `output/${jsonOutputFile}`), jsonStringData, err => {
    console.error(err);
  });
};

(async () => {
  const studentData = await formatData('overall-peers.csv', {
    'Student': 'name',
    'SIS User ID': 'studentId'
  }, 3);
  writeData('students.json', studentData);
})();
