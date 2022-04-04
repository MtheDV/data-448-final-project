import {AnalysisTeamAssignmentsDetails, Team} from '../../types';
import {analysisTypeNegative, analysisTypePositive} from '../../constants';
import {Dispatch, SetStateAction} from 'react';

type AnalysisProps = {
  analysis: AnalysisTeamAssignmentsDetails,
  team?: Team,
  setSelectedTeamFromAnalysis: Dispatch<SetStateAction<number | undefined>>
}

const TeamAnalysisDetails = ({analysis, team, setSelectedTeamFromAnalysis}: AnalysisProps) => {
  const setSelected = () => {
    setSelectedTeamFromAnalysis(team?.id);
  };
  
  return (
    <div>
      <h3 className={'text-lg font-semibold mb-2'}>{team?.name}</h3>
      <button
        className={`text-left p-3 border ${analysis.type === analysisTypeNegative ? 'border-red-400' : analysis.type === analysisTypePositive ? 'border-green-600' : 'border-gray-400'} rounded-lg hover:bg-gray-100 hover:shadow`}
        onClick={setSelected}
      >
        <p>{analysis.results}</p>
      </button>
    </div>
  );
};

export default TeamAnalysisDetails;
