import {Student} from './students';

export type StudentDataType = Array<{ student?: Student, grade: number }>
export type DataType = number | string | StudentDataType;
export type DataObject = { [index: string]: DataType };
export type Data = Array<DataObject>;
export type Series = Array<{
  dataKey: string,
  data: Data
}>;
