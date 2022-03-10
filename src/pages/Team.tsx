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
  
  if (isErrorTeam && teamError && 'status' in teamError) {
    return (
      <div>
        <h1>Error!</h1>
        <p>Error: {teamError.data}</p>
      </div>
    );
  }
  
  if (isErrorEnrollments && enrollmentsError && 'status' in enrollmentsError) {
    return (
      <div>
        <h1>Error!</h1>
        <p>Error: {enrollmentsError.data}</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1>{team && team.name}</h1>
      <Spinner isLoading={isLoadingTeam || isLoadingEnrollments}/>
      <hr/>
      <h2>Students</h2>
      <ul>
        {enrollments && enrollments.map(enrollment =>
          <li key={`enrollment-${enrollment.id}`}>
            {enrollment.student.name}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Team;
