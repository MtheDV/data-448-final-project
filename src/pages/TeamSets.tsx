import {routes} from '../routing';
import {Link} from 'react-router-dom';
import {useGetTeamSetsQuery} from '../redux/slices/api/apiSlice';
import Spinner from '../components/Spinner/Spinner';

const TeamSets = () => {
  const {
    data,
    isLoading,
    isError,
    error
  } = useGetTeamSetsQuery();
  
  return (
    <div>
      <div className={'flex justify-between items-center mb-5'}>
        <h1 className={'text-3xl font-bold'}>Team Sets</h1>
        <Spinner isLoading={isLoading}/>
      </div>
      <hr/>
      {isError && <p>Error! {error && 'status' in error && error.data}</p>}
      <ul className={'mt-5'}>
        {data && data.map((teamSet) =>
          <li key={`team-set-${teamSet.id}`}>
            <Link to={`${routes.teamSets}/${teamSet.id}`}>
              <span className={'text-blue-500 hover:text-blue-600'}>{teamSet.name}</span>
            </Link>
          </li>
        )}
      </ul>
      {(!data || data.length <= 0) && <p>Looks like there are no team sets</p>}
    </div>
  );
};

export default TeamSets;
