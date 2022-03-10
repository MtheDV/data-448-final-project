import {useGetTeamEnrollmentsQuery, useGetTeamQuery} from '../redux/slices/api/apiSlice';
import {useParams} from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';

const Team = () => {
  const {teamSetId, teamId} = useParams();
  const {
    data: team,
    isLoading: isLoadingTeam,
    isError: isErrorTeam,
    error: teamError
  } = useGetTeamQuery([Number(teamSetId), Number(teamId)]);
  const {
    data: enrollments,
    isLoading: isLoadingEnrollments,
    isError: isErrorEnrollments,
    error: enrollmentsError
  } = useGetTeamEnrollmentsQuery([Number(teamSetId), Number(teamId)]);
  
  return (
    <div>
      <h1>{team && team.name}</h1>
      <Spinner isLoading={isLoadingTeam || isLoadingEnrollments}/>
      <hr/>
      {isErrorTeam && <p>Error! {teamError && 'status' in teamError && teamError.data}</p>}
      {isErrorEnrollments && <p>Error! {enrollmentsError && 'status' in enrollmentsError && enrollmentsError.data}</p>}
      {enrollments &&
        <>
          <h2>Students</h2>
          <ul>
            {enrollments && enrollments.map(enrollment =>
              <li key={`enrollment-${enrollment.id}`}>
                {enrollment.student.name}
              </li>
            )}
          </ul>
        </>
      }
      {(!enrollments || enrollments.length <= 0) && <p>Looks like there are no students</p>}
    </div>
  );
};

export default Team;
