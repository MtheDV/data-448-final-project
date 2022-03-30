import {AnalysisTeamAssignmentsDetails, Team} from '../../types';
import {analysisTypeNegative, analysisTypePositive} from '../../constants';

type AnalysisProps = {
  analysis: AnalysisTeamAssignmentsDetails,
  team?: Team
}

const TeamAnalysisDetails = ({analysis, team}: AnalysisProps) => {
  return (
    <div>
      <h3 className={'text-lg font-semibold my-2'}>{team?.name}</h3>
      <div
        className={`p-3 border ${analysis.type === analysisTypeNegative ? 'border-red-400' : analysis.type === analysisTypePositive ? 'border-blue-400' : 'border-gray-400'} rounded-lg`}>
        <p>{analysis.results}</p>
      </div>
    </div>
  );
};

export default TeamAnalysisDetails;
