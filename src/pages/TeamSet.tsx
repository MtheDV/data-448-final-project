import {useParams} from 'react-router-dom';
import {useGetTeamSetQuery} from '../redux/slices/api/apiSlice';

const TeamSet = () => {
  const {teamSetId} = useParams();
  const {
    data,
    isLoading,
    isError,
    isSuccess
  } = useGetTeamSetQuery(Number(teamSetId));
  
  return (
    <div>
      {(isSuccess && data) && <h1>{data.name}</h1>}
      {isError && <h1>Sorry! Looks like we couldn&apos;t find that team set.</h1>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default TeamSet;
