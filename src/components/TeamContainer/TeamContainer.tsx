import {Team} from '../../types';
import {Link} from 'react-router-dom';

type TeamContainerProps = {
  team: Team
}

const TeamContainer = ({team}: TeamContainerProps) => {
  return (
    <Link to={`teams/${team.id}`}>
      <h2>{team.name}</h2>
    </Link>
  );
};

export default TeamContainer;
