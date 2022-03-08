import {useParams} from 'react-router-dom';

const TeamSet = () => {
  const { teamSetId } = useParams();
  
  return (
    <div>
      <h1>Team Set {teamSetId}</h1>
    </div>
  );
};

export default TeamSet;
