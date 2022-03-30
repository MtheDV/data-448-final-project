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
        <div className={'relative h-40 border border-gray-400 rounded-lg bg-white hover:bg-gray-100 hover:shadow overflow-hidden'}>
          <h3 className={'absolute top-3 left-3 text-lg'}>{team.name}</h3>
          <div className={'absolute bottom-0 left-0 p-3 flex flex-wrap flex-wrap-reverse gap-1'}>
            {team.enrollments.map(enrollment =>
              <div key={`team-${enrollment.id}`} className={'w-10 h-10 rounded-full bg-gray-300'}>
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default TeamContainer;
