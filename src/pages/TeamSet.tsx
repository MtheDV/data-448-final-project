import {useParams} from 'react-router-dom';
import {useGetTeamSetQuery, useGetTeamsQuery} from '../redux/slices/api/apiSlice';
import {TeamContainer} from '../components';

const TeamSet = () => {
  const {teamSetId} = useParams();
  const {
    data: teamSet,
    isLoading: isLoadingTeamSet,
    isError: isErrorTeamSet,
    isSuccess: isSuccessTeamSet
  } = useGetTeamSetQuery(Number(teamSetId));
  const {
    data: teams,
    isLoading: isLoadingTeams,
    isError: isErrorTeams,
    isSuccess: isSuccessTeams
  } = useGetTeamsQuery(Number(teamSetId));
  
  return (
    <div>
      {(isSuccessTeamSet && teamSet) && <h1>{teamSet.name}</h1>}
      {isErrorTeamSet && <h1>Sorry! Looks like we couldn&apos;t find that team set.</h1>}
      {isLoadingTeamSet && <p>Loading...</p>}
      <hr/>
      <div>
        {(isSuccessTeams && teams) && teams.map(team =>
          <TeamContainer key={`team-${team.id}`} team={team}/>
        )}
        {isErrorTeams && <h2>Unable to load teams for this team set.</h2>}
        {isLoadingTeams && <p>Loading teams...</p>}
      </div>
    </div>
  );
};

export default TeamSet;
