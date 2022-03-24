import {useGetTeamAssignmentsQuery, useGetTeamEnrollmentsQuery, useGetTeamQuery} from '../redux/slices/api/apiSlice';
import {useParams} from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import {StudentTeamVisual} from '../components';
import TeamVisual from '../components/TeamVisual/TeamVisual';
import {useMemo} from 'react';

const Team = () => {
  const {teamSetId, teamId} = useParams();
  const {
    data: team,
    isLoading: isLoadingTeam,
    isError: isErrorTeam,
    error: teamError
  } = useGetTeamQuery({teamSetId: Number(teamSetId), teamId: Number(teamId)});
  const {
    data: enrollments,
    isLoading: isLoadingEnrollments,
    isError: isErrorEnrollments,
    error: enrollmentsError
  } = useGetTeamEnrollmentsQuery({teamSetId: Number(teamSetId), teamId: Number(teamId)});
  const {
    data: assignments,
    isLoading: isLoadingAssignments,
    isError: isErrorAssignments,
    error: assignmentsError
  } = useGetTeamAssignmentsQuery({teamSetId: Number(teamSetId), teamId: Number(teamId), submissions: true});
  
  const students = useMemo(() => enrollments?.map(enrollment => enrollment.student), [enrollments]);
  
  return (
    <div>
      <h1>{team && team.name}</h1>
      <Spinner isLoading={isLoadingTeam || isLoadingEnrollments || isLoadingAssignments}/>
      <hr/>
      {isErrorTeam && <p>Error! {teamError && 'status' in teamError && teamError.data}</p>}
      {isErrorEnrollments && <p>Error! {enrollmentsError && 'status' in enrollmentsError && enrollmentsError.data}</p>}
      {isErrorAssignments && <p>Error! {assignmentsError && 'status' in assignmentsError && assignmentsError.data}</p>}
      {students && assignments &&
        <>
          <h2>Assignment Performance</h2>
          <TeamVisual students={students} assignments={assignments}/>
        </>
      }
      {enrollments && assignments &&
        <>
          <h2>Students</h2>
          <ul>
            {enrollments.map(enrollment =>
              <StudentTeamVisual
                key={`enrollment-${enrollment.id}`}
                student={enrollment.student}
                teamAssignments={assignments}/>
            )}
          </ul>
        </>
      }
      {(!enrollments || enrollments.length <= 0) && <p>Looks like there are no students</p>}
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
