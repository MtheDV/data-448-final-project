import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {fetchTeamSets, getTeamSets} from '../redux/slices/teamSetsSlice';
import {useEffect} from 'react';

const Home = () => {
  const {teamSets, status, error} = useAppSelector(getTeamSets);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (status === 'idle' || status === 'error') {
      dispatch(fetchTeamSets());
    }
  }, []);
  
  return (
    <div>
      <h1>Home</h1>
      <h2>Team Sets</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error! {error}</p>}
      {teamSets && teamSets.map((teamSet) =>
        <p key={`team-set-${teamSet.id}`}>{teamSet.name}</p>
      )}
      {teamSets.length <= 0 && <p>Looks like there are no team sets</p>}
    </div>
  );
};

export default Home;
