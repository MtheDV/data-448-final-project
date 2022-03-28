import {useGetAssignmentsQuery, useGetTeamQuery, useGetTeamStudentsQuery} from '../redux/slices/api/apiSlice';
import {useParams} from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import {StudentTeamVisual} from '../components';
import TeamVisual from '../components/TeamVisual/TeamVisual';
import {useMemo} from 'react';
import {analyzeStudents} from '../utils/analyzeTeams';
import {GraphData} from '../types';
import {prepareTeamGraphSeries} from '../utils';

const Team = () => {
  const {teamSetId, teamId} = useParams();
  const {
    data: team,
    isLoading: isLoadingTeam,
    isError: isErrorTeam,
    error: teamError
  } = useGetTeamQuery({teamSetId: Number(teamSetId), teamId: Number(teamId)});
  const {
    data: students,
    isLoading: isLoadingStudents,
    isError: isErrorStudents,
    error: studentsError
  } = useGetTeamStudentsQuery({teamSetId: Number(teamSetId), teamId: Number(teamId)});
  const {
    data: assignments,
    isLoading: isLoadingAssignments,
    isError: isErrorAssignments,
    error: assignmentsError
  } = useGetAssignmentsQuery(true);
  
  const filteredAssignments = useMemo(() =>
    assignments?.map(assignment => {
      return {
        ...assignment,
        submissions: assignment.submissions.filter(submission => students?.map(student => student.id).includes(submission.studentId))
      };
    }), [assignments, students]);
  const [studentsAnalyses, studentsAverage] = useMemo(() => analyzeStudents(students?.map(student => student.id) ?? [], filteredAssignments ?? []), [students, assignments]);
  const teamGraphData = useMemo<GraphData>(() => prepareTeamGraphSeries(assignments ?? [], students ?? []), [assignments, students]);
  
  return (
    <div>
      <h1>{team && team.name}</h1>
      <Spinner isLoading={isLoadingTeam || isLoadingStudents || isLoadingAssignments}/>
      <hr/>
      {isErrorTeam && <p>Error! {teamError && 'status' in teamError && teamError.data}</p>}
      {isErrorStudents && <p>Error! {studentsError && 'status' in studentsError && studentsError.data}</p>}
      {isErrorAssignments && <p>Error! {assignmentsError && 'status' in assignmentsError && assignmentsError.data}</p>}
      {students && filteredAssignments &&
        <>
          <h2>Assignment Performance</h2>
          <TeamVisual graphData={teamGraphData}/>
        </>
      }
      {students && studentsAnalyses && filteredAssignments &&
        <>
          <h2>Students</h2>
          <p>{studentsAverage.toFixed(1)}% Average</p>
          <ul>
            {students.map(student =>
              <StudentTeamVisual
                key={`enrollment-${student.id}`}
                student={student}
                graphData={teamGraphData.filter(data => data.id === student.name)}
                analysisData={studentsAnalyses.find(studentsAnalysis => studentsAnalysis.studentId === student.id)}
              />
            )}
          </ul>
        </>
      }
      {(!students || students.length <= 0) && <p>Looks like there are no students</p>}
      {assignments &&
        <>
          <h2>Assignments</h2>
          <ul>
            {assignments.map(assignment =>
              <li key={`assignment-${assignment.id}`}>
                {assignment.name}
              </li>
            )}
          </ul>
        </>
      }
      {(!assignments || assignments.length <= 0) && <p>Looks like there are no assignments</p>}
    </div>
  );
};

export default Team;
