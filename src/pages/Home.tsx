import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getTeamSets, selectTeamSets} from '../redux/slices/teamSetsSlice';
import {useEffect} from 'react';

const Home = () => {
  const {teamSets, loading, error} = useAppSelector(selectTeamSets);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getTeamSets());
  }, []);
  
  return (
    <div>
      <h1>Home</h1>
      <h2>Team Sets</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error! {error}</p>}
      {teamSets && teamSets.map(teamSet =>
        <p key={`team-set-${teamSet.id}`}>{teamSet.name}</p>
      )}
      {teamSets.length <= 0 && <p>Looks like there are no team sets</p>}
    </div>
  );
};

export default Home;
