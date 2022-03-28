import {LineProps, ResponsiveLine} from '@nivo/line';
import {GraphData} from '../../../types';
import Tooltip from '../Tooltip/Tooltip';

type LineGraphProps = {
  data: GraphData,
  tooltipDisplayAverage?: boolean,
  lineProps?: Partial<LineProps>
}

const LineGraph = ({data, tooltipDisplayAverage, lineProps}: LineGraphProps) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{top: 10, bottom: 30, right: 10, left: 30}}
      xScale={{type: 'point'}}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto'
      }}
      pointLabelYOffset={0}
      curve={'monotoneX'}
      enablePoints={false}
      enableSlices={'x'}
      sliceTooltip={({slice}) => {
        return (
          <Tooltip>
            {tooltipDisplayAverage &&
              <>
                <p>
                  {slice.points.length > 0 && slice.points[0].data.xFormatted}:&nbsp;
                  {slice.points.reduce((prev, curr) => {
                    return prev + Number(curr.data.yFormatted) / slice.points.length;
                  }, 0).toFixed(1)}%
                </p>
                <hr/>
              </>
            }
            {slice.points.map((point, index) =>
              <div key={`point-${index}`}>
                <div style={{backgroundColor: point.color, width: '1rem', height: '1rem'}}/>
                <p>{point.serieId}: {tooltipDisplayAverage ? Number(point.data.yFormatted).toFixed(1) : point.data.yFormatted}%</p>
              </div>
            )}
          </Tooltip>
        );
      }}
      {...lineProps}
    />
  );
};

export default LineGraph;
