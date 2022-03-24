import {curveMonotoneX} from '@visx/curve';
import {Axis, Grid, LineSeries, Tooltip, XYChart} from '@visx/xychart';
import {DataObject, DataType, Series} from '../../../types';
import {ReactNode} from 'react';
import {RenderTooltipParams} from '@visx/xychart/lib/components/Tooltip';

type LineGraphProps = {
  series: Series
  xAccessor: (d: DataObject) => DataType,
  yAccessor: (d: DataObject) => DataType,
  options?: {
    width?: number,
    height: number,
    tooltip: boolean,
    tooltipRender: (params: RenderTooltipParams<DataObject>) => ReactNode,
    axis: boolean,
    xAxisTicks?: number,
    yAxisTicks?: number,
    gridTicks?: number
  }
}

const LineGraph = ({series, xAccessor, yAccessor, options}: LineGraphProps) => {
  return (
    <XYChart
      height={options?.height}
      xScale={{type: 'band'}}
      yScale={{type: 'linear'}}
    >
      {options?.axis &&
        <>
          <Axis orientation={'bottom'} numTicks={options?.xAxisTicks}/>
          <Axis orientation={'left'} numTicks={options?.yAxisTicks}/>
          <Grid columns={false} numTicks={options?.gridTicks ?? 3}/>
        </>
      }
      {series.map((lineSeries, index) =>
        <LineSeries
          key={`line-series-${index}`}
          dataKey={lineSeries.dataKey}
          data={lineSeries.data}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
          curve={curveMonotoneX}
        />
      )}
      {options?.tooltip &&
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={options?.tooltipRender}
        />
      }
    </XYChart>
  );
};

export default LineGraph;
