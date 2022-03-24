import {Assignment, Student} from '../../types';
import {useMemo} from 'react';
import {filterAssignmentsForStudent, getAverageAssignmentsGrade, prepareStudentTeamGraphSeries} from '../../utils';
import {LineGraph} from '../Graphs';

type StudentTeamVisualProps = {
  student: Student,
  teamAssignments: Array<Assignment>
}

const StudentTeamVisual = ({student, teamAssignments}: StudentTeamVisualProps) => {
  const studentAssignments = useMemo<Array<Assignment>>(() => filterAssignmentsForStudent(student.id, teamAssignments), [student.id, teamAssignments]);
  const graphSeries = useMemo(() => prepareStudentTeamGraphSeries(studentAssignments), [studentAssignments]);
  const averageAssignmentsGrade = useMemo(() => getAverageAssignmentsGrade(studentAssignments), [studentAssignments]);
  
  return (
    <li>
      <h3>{student.name}</h3>
      <div>
        <LineGraph
          series={graphSeries}
          xAccessor={(d) => d.x}
          yAccessor={(d) => d.y}
          options={{
            height: 400,
            tooltip: false,
            tooltipRender: () => <></>,
            axis: false
          }}
        />
      </div>
      <p>{averageAssignmentsGrade.toFixed(1)}%</p>
    </li>
  );
};

export default StudentTeamVisual;
