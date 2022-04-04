import {LineProps, Line} from '@nivo/line';
import {LineGraphData} from '../../../types';
import Tooltip from '../Tooltip/Tooltip';
import AutoSizer from 'react-virtualized-auto-sizer';

type LineGraphProps = {
  data: LineGraphData,
  displayTooltip?: 'number' | 'string' | 'none'
  lineProps?: Partial<LineProps>
}

const LineGraph = ({data, displayTooltip, lineProps}: LineGraphProps) => {
  return (
    <AutoSizer>
      {({width, height}) => (
        <Line
          width={width}
          height={height}
          data={data}
          margin={{top: 10, bottom: 30, right: 10, left: 30}}
          xScale={{type: 'point'}}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto'
          }}
          pointSize={8}
          pointLabelYOffset={0}
          curve={'monotoneX'}
          useMesh={displayTooltip !== 'none' && lineProps?.enableSlices === false}
          tooltip={({point}) => {
            return (
              <Tooltip>
                <p className={'text-sm'}>
                  {point.data.xFormatted}
                </p>
                <hr className={'my-1'}/>
                <div className={'flex items-center'}>
                  <div style={{backgroundColor: point.color}} className={'w-3 h-3 rounded mr-1'}/>
                  <p>
                    {point.serieId}:&nbsp;
                    <span className={'font-bold'}>
                      {displayTooltip === 'number' ? Number(point.data.yFormatted).toFixed(1) : point.data.yFormatted}%
                    </span>
                  </p>
                </div>
              </Tooltip>
            );
          }}
          enablePoints={true}
          enableSlices={'x'}
          sliceTooltip={({slice}) => {
            return (
              <Tooltip>
                {displayTooltip === 'number' &&
                  <>
                    <p className={'text-sm'}>
                      {slice.points.length > 0 && slice.points[0].data.xFormatted}:&nbsp;
                      <span className={'font-bold'}>
                        {slice.points.reduce((prev, curr) => {
                          return prev + Number(curr.data.yFormatted) / slice.points.length;
                        }, 0).toFixed(1)}%
                      </span>
                    </p>
                    <hr className={'my-1'}/>
                  </>
                }
                {slice.points.map((point, index) =>
                  <div key={`point-${index}`} className={'flex items-center gap-2'}>
                    <div style={{backgroundColor: point.color}} className={'w-3 h-3 rounded mr-1'}/>
                    <p
                      className={'text-sm'}>{point.serieId}:&nbsp;
                      <span className={'font-bold'}>
                        {displayTooltip === 'number' ? Number(point.data.yFormatted).toFixed(1) : point.data.yFormatted}%
                      </span>
                    </p>
                  </div>
                )}
              </Tooltip>
            );
          }}
          {...lineProps}
        />
      )}
    </AutoSizer>
  );
};

export default LineGraph;
