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
    <li>
      <h3>{student.name}</h3>
      <p>{analysisData?.averageGrade.toFixed(1)}%</p>
      {analysisData?.details.map((analysisDetail, index) =>
        analysisDetail.type !== 'neutral' &&
        <p key={`${student.id}-analysis-${index}`}>{analysisDetail.results}</p>
      )}
      <div style={{height: '5rem'}}>
        <LineGraph
          data={graphData}
          lineProps={{
            margin: {top: 20, right: 0, bottom: 5, left: 0},
            axisLeft: null,
            axisBottom: null,
            enableArea: true,
            enableSlices: false,
            enableGridX: false,
            enableGridY: false
          }}
        />
      </div>
    </li>
  );
};

export default StudentTeamVisual;
