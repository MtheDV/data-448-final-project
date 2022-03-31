import {AnalysisStudentAssignmentsDetails, Student} from '../../types';
import {GraphData} from '../../types';
import LineGraph from '../Graphs/LineGraph/LineGraph';
import {useEffect, useRef, useState} from 'react';

type StudentTeamVisualProps = {
  student: Student,
  graphData: GraphData,
  analysisData?: AnalysisStudentAssignmentsDetails,
  selected: boolean
}

const StudentTeamVisual = ({student, graphData, analysisData, selected}: StudentTeamVisualProps) => {
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
    <li ref={containerRef} className={`h-40 relative border ${selected ? 'border-2 border-blue-500 shadow-lg' : 'border-gray-400'} rounded-lg overflow-hidden`}>
      <h3 className={'absolute top-3 left-3 text-lg'}>{student.name}</h3>
      <p className={'absolute left-3 bottom-3 text-2xl font-semibold'}>{analysisData?.averageGrade.toFixed(1)}%</p>
      <LineGraph
        data={graphData}
        displayTooltip={'none'}
        lineProps={{
          margin: {top: 60, right: 0, bottom: 0, left: 0},
          axisLeft: null,
          axisBottom: null,
          enableArea: true,
          enableSlices: false,
          enableGridX: false,
          enableGridY: false,
          enablePoints: false
        }}
      />
    </li>
  );
};

export default StudentTeamVisual;
