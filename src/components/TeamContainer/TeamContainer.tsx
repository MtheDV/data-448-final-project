import {AnalysisTeamAssignmentsDetails, Team} from '../../types';
import {Link} from 'react-router-dom';
import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {analysisTypeNegative, analysisTypePositive} from '../../constants';

type TeamContainerProps = {
  team: Team
  teamAnalysis?: AnalysisTeamAssignmentsDetails
  selected: boolean,
  setSelectedTeamFromAnalysis: Dispatch<SetStateAction<number | undefined>>
}

const TeamContainer = ({team, teamAnalysis, selected, setSelectedTeamFromAnalysis}: TeamContainerProps) => {
  const containerRef = useRef<null | HTMLAnchorElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    if (!selected) {
      setHasScrolled(false);
      return;
    }
    
    if (!hasScrolled) {
      window.scrollTo({
        behavior: 'smooth',
        top: (containerRef.current?.offsetTop ?? 0) - window.innerHeight / 2 + (containerRef.current?.offsetHeight ?? 0) / 2
      });
      containerRef.current?.focus();
      setHasScrolled(true);
    }
  }, [selected]);
  
  const removeFocus = () => {
    setSelectedTeamFromAnalysis(undefined);
  };
  
  return (
    <li>
      <Link to={`teams/${team.id}`} ref={containerRef} onBlur={removeFocus}>
        <div className={`relative h-40 border-2 ${selected ? 'border-blue-500 shadow-lg' : (teamAnalysis?.type === analysisTypeNegative ? 'border-red-400' : teamAnalysis?.type === analysisTypePositive ? 'border-green-600' : 'border-gray-400')} rounded-lg bg-white hover:bg-gray-100 hover:shadow overflow-hidden`}>
          <h3 className={'absolute top-3 left-3 text-lg'}>{team.name}</h3>
          <div className={'absolute bottom-0 left-0 p-3 flex flex-wrap flex-wrap-reverse gap-1'}>
            {teamAnalysis?.details.map(studentAnalysis =>
              <div key={`team-${studentAnalysis.studentId}`} className={`w-10 h-10 rounded-full bg-gray-300 border-2 ${studentAnalysis.overallType === analysisTypeNegative ? 'border-red-400' : studentAnalysis.overallType === analysisTypePositive ? 'border-green-600' : 'border-gray-400'}`}>
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default TeamContainer;
