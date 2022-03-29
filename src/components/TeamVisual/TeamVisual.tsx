import {GraphData} from '../../types';
import LineGraph from '../Graphs/LineGraph/LineGraph';

type TeamVisualProps = {
  graphData: GraphData,
}

const TeamVisual = ({graphData}: TeamVisualProps) => {
  return (
    <div style={{height: '20rem'}}>
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
