import {AnalysisTeamAssignmentsDetails, Team} from '../../types';
import {Link} from 'react-router-dom';

type TeamContainerProps = {
  team: Team
  teamAnalysis?: AnalysisTeamAssignmentsDetails
}

const TeamContainer = ({team, teamAnalysis}: TeamContainerProps) => {
  return (
    <li>
      <Link to={`teams/${team.id}`}>
        {team.name}
      </Link>
      {teamAnalysis &&
        <>
          <p>{teamAnalysis.results}</p>
        </>
      }
    </li>
  );
};

export default TeamContainer;
