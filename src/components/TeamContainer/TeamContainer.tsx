import {AnalysisTeamAssignmentsDetails, Team} from '../../types';
import {Link} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';

type TeamContainerProps = {
  team: Team
  teamAnalysis?: AnalysisTeamAssignmentsDetails
  selected: boolean
}

const TeamContainer = ({team, selected}: TeamContainerProps) => {
  const containerRef = useRef<null | HTMLLIElement>(null);
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
      setHasScrolled(true);
    }
  }, [selected]);
  
  return (
    <li ref={containerRef}>
      <Link to={`teams/${team.id}`}>
        <div className={`relative h-40 border ${selected ? 'border-2 border-blue-500 shadow-lg' : 'border-gray-400'} rounded-lg bg-white hover:bg-gray-100 hover:shadow overflow-hidden`}>
          <h3 className={'absolute top-3 left-3 text-lg'}>{team.name}</h3>
          <div className={'absolute bottom-0 left-0 p-3 flex flex-wrap flex-wrap-reverse gap-1'}>
            {team.enrollments.slice(0, 6).map(enrollment =>
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
