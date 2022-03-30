import {AnalysisTeamAssignmentsDetails, Team} from '../../types';

type AnalysisProps = {
  analysis: AnalysisTeamAssignmentsDetails,
  team?: Team
}

const TeamAnalysisDetails = ({analysis, team}: AnalysisProps) => {
  return (
    <div>
      <h3 className={'text-lg font-semibold my-4'}>{team?.name}</h3>
      <p>{analysis.results}</p>
    </div>
  );
};

export default TeamAnalysisDetails;
