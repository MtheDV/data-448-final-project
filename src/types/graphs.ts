export type LineDataType = {
  x: number | string,
  y: number | string
}

export type LineData = {
  id: string,
  color?: string,
  data: Array<LineDataType>
};

export type LineGraphData = Array<LineData>;
