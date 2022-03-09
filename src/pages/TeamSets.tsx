import {routes} from '../routing';
import {Link} from 'react-router-dom';
import {useGetTeamSetsQuery} from '../redux/slices/api/apiSlice';

const TeamSets = () => {
  const {
    data,
    isLoading,
    isError,
    error
  } = useGetTeamSetsQuery();
  
  return (
    <div>
      <h1>Team Sets</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error! {error && 'status' in error && error.data}</p>}
      <ul>
        {data && data.map((teamSet) =>
          <li key={`team-set-${teamSet.id}`}><Link to={`${routes.teamSets}/${teamSet.id}`}>{teamSet.name}</Link></li>
        )}
      </ul>
      {(!data || data.length <= 0) && <p>Looks like there are no team sets</p>}
    </div>
  );
};

export default TeamSets;
