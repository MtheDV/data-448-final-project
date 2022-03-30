import {AnalysisTeamAssignmentsDetails, Team} from '../../types';
import {Link} from 'react-router-dom';

type TeamContainerProps = {
  team: Team
  teamAnalysis?: AnalysisTeamAssignmentsDetails
}

const TeamContainer = ({team}: TeamContainerProps) => {
  return (
    <li>
      <Link to={`teams/${team.id}`}>
        <span className={'text-blue-500 hover:text-blue-600'}>{team.name}</span>
      </Link>
    </li>
  );
};

export default TeamContainer;
