import {AnalysisStudentAssignmentsDetails, Student} from '../../types';
import {GraphData} from '../../types';
import LineGraph from '../Graphs/LineGraph/LineGraph';

type StudentTeamVisualProps = {
  student: Student,
  graphData: GraphData,
  analysisData?: AnalysisStudentAssignmentsDetails
}

const StudentTeamVisual = ({student, graphData, analysisData}: StudentTeamVisualProps) => {
  return (
    <li className={'h-52 relative border border-gray-400 rounded-lg overflow-hidden'}>
      <h3 className={'absolute top-3 left-3 text-lg'}>{student.name}</h3>
      <p className={'absolute left-3 bottom-3 text-2xl font-semibold'}>{analysisData?.averageGrade.toFixed(1)}%</p>
      {analysisData?.details.map((analysisDetail, index) =>
        analysisDetail.type !== 'neutral' &&
        <p key={`${student.id}-analysis-${index}`}>{analysisDetail.results}</p>
      )}
      <LineGraph
        data={graphData}
        displayTooltip={'none'}
        lineProps={{
          margin: {top: 60, right: 0, bottom: 0, left: 0},
          axisLeft: null,
          axisBottom: null,
          enableArea: true,
          enableSlices: false,
          enableGridX: false,
          enableGridY: false,
          enablePoints: false
        }}
      />
    </li>
  );
};

export default StudentTeamVisual;
