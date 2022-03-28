export type GraphData = Array<Data>;

export type DataType = {
  x: number | string,
  y: number | string
}

export type Data = {
  id: string,
  color?: string,
  data: Array<DataType>
};
