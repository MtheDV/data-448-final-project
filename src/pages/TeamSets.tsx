import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {fetchTeamSets, getTeamSets} from '../redux/slices/teamSetsSlice';
import {routes} from '../routing';
import {Link} from 'react-router-dom';

const TeamSets = () => {
  const {teamSets, status, error} = useAppSelector(getTeamSets);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (status === 'idle' || status === 'error') {
      dispatch(fetchTeamSets());
    }
  }, []);
  
  return (
    <div>
      <h1>Team Sets</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error! {error}</p>}
      {teamSets && teamSets.map((teamSet) =>
        <Link key={`team-set-${teamSet.id}`} to={`${routes.teamSets}/${teamSet.id}`}>{teamSet.name}</Link>
      )}
      {teamSets.length <= 0 && <p>Looks like there are no team sets</p>}
    </div>
  );
};

export default TeamSets;
