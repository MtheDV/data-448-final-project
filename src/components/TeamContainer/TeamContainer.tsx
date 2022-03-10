import {Team} from '../../types';
import {Link} from 'react-router-dom';

type TeamContainerProps = {
  team: Team
}

const TeamContainer = ({team}: TeamContainerProps) => {
  return (
    <li>
      <Link to={`teams/${team.id}`}>
        {team.name}
      </Link>
    </li>
  );
};

export default TeamContainer;
