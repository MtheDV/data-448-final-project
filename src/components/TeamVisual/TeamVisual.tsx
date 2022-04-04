import {LineGraphData} from '../../types';
import LineGraph from '../Graphs/LineGraph/LineGraph';

type TeamVisualProps = {
  graphData: LineGraphData,
}

const TeamVisual = ({graphData}: TeamVisualProps) => {
  return (
    <div className={'h-72 p-4 border border-gray-400 rounded-lg'}>
      <LineGraph
        data={graphData}
        displayTooltip={'number'}
        lineProps={{
          margin: {top: 10, bottom: 10, right: 10, left: 30},
          axisBottom: null
        }}
      />
    </div>
  );
};

export default TeamVisual;
