import {Assignment, Series, Student} from '../../types';
import {LineGraph} from '../Graphs';
import {useMemo} from 'react';
import {prepareTeamGraphSeries} from '../../utils';

type TeamVisualProps = {
  students: Array<Student>,
  assignments: Array<Assignment>
}

const TeamVisual = ({students, assignments}: TeamVisualProps) => {
  const graphSeries = useMemo<Series>(() => prepareTeamGraphSeries(assignments, students), [assignments]);
  
  return (
    <div>
      <LineGraph
        series={graphSeries}
        xAccessor={d => d.x}
        yAccessor={d => d.y}
        options={{
          height: 500,
          axis: true,
          xAxisTicks: 4,
          tooltip: true,
          tooltipRender: (params =>
            <>
              <p>{params.tooltipData?.nearestDatum?.datum?.x}</p>
              {params.tooltipData?.nearestDatum?.datum?.studentGrades instanceof Array && params.tooltipData?.nearestDatum?.datum?.studentGrades.map((student) =>
                <p key={`${student.student?.id}-assignments-grade`}>{student.student?.name}: {student.grade.toFixed(1)}%</p>
              )}
            </>
          )
        }}
      />
    </div>
  );
};

export default TeamVisual;
