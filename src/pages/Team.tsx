import {useGetTeamQuery} from '../redux/slices/api/apiSlice';
import {useParams} from 'react-router-dom';

const Team = () => {
  const {teamSetId, teamId} = useParams();
  const {
    data: team,
    isLoading: isLoadingTeam,
    isError: isErrorTeam,
    error: teamError
  } = useGetTeamQuery([Number(teamSetId), Number(teamId)]);
  
  if (isErrorTeam && teamError && 'status' in teamError) {
    return (
      <div>
        <h1>Error!</h1>
        <p>Error: {teamError.data}</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1>{team && team.name}</h1>
      {isLoadingTeam && <p>Loading...</p>}
    </div>
  );
};

export default Team;
