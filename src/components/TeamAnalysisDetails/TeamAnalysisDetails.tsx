import {AnalysisTeamAssignmentsDetails, Team} from '../../types';

type AnalysisProps = {
  analysis: AnalysisTeamAssignmentsDetails,
  team?: Team
}

const TeamAnalysisDetails = ({analysis, team}: AnalysisProps) => {
  return (
    <div>
      <h3 className={'text-lg font-semibold my-2'}>{team?.name}</h3>
      <div className={`p-3 border ${analysis.type === 'negative' ? 'border-red-400' : analysis.type === 'positive' ? 'border-blue-400' : 'border-gray-400'} rounded-lg`}>
        <p>{analysis.results}</p>
      </div>
    </div>
  );
};

export default TeamAnalysisDetails;
