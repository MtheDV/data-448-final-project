import {useGetAssignmentsQuery, useGetTeamQuery, useGetTeamStudentsQuery} from '../redux/slices/api/apiSlice';
import {useParams} from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import {StudentTeamVisual} from '../components';
import TeamVisual from '../components/TeamVisual/TeamVisual';
import {useMemo, useState} from 'react';
import {analyzeStudents} from '../utils/analyzeTeams';
import {AnalysisStudentAssignmentsDetails, LineGraphData} from '../types';
import {prepareTeamGraphSeries} from '../utils';
import StudentAnalysisDetails from '../components/StudentAnalysisDetails/StudentAnalysisDetails';

const Team = () => {
  const {teamSetId, teamId} = useParams();
  const {
    data: team,
    isLoading: isLoadingTeam,
    isError: isErrorTeam,
    error: teamError
  } = useGetTeamQuery({teamSetId: Number(teamSetId), teamId: Number(teamId)});
  const {
    data: students,
    isLoading: isLoadingStudents,
    isError: isErrorStudents,
    error: studentsError
  } = useGetTeamStudentsQuery({teamSetId: Number(teamSetId), teamId: Number(teamId)});
  const {
    data: assignments,
    isLoading: isLoadingAssignments,
    isError: isErrorAssignments,
    error: assignmentsError
  } = useGetAssignmentsQuery(true);
  
  const filteredAssignments = useMemo(() =>
    assignments?.map(assignment => {
      return {
        ...assignment,
        submissions: assignment.submissions.filter(submission => students?.map(student => student.id).includes(submission.studentId))
      };
    }), [assignments, students]);
  const {analyses: studentsAnalyses} = useMemo<{ analyses: Array<AnalysisStudentAssignmentsDetails>, average: number }>(() => analyzeStudents(students?.map(student => student.id) ?? [], filteredAssignments ?? []), [students, assignments]);
  const teamGraphData = useMemo<LineGraphData>(() => prepareTeamGraphSeries(assignments ?? [], students ?? []), [assignments, students]);
  
  const [selectedStudentFromAnalysis, setSelectedStudentFromAnalysis] = useState<number | undefined>(undefined);
  
  return (
    <>
      <div className={'flex justify-between items-center mb-5'}>
        <h1 className={'text-3xl font-bold'}>{team && team.name}</h1>
        <Spinner isLoading={isLoadingTeam || isLoadingStudents || isLoadingAssignments}/>
      </div>
      <hr/>
      <div className={'flex flex-col md:flex-row'}>
        <div className={'md:pr-4 flex-grow'}>
          {isErrorTeam && <p>Error! {teamError && 'status' in teamError && teamError.data}</p>}
          {isErrorStudents && <p>Error! {studentsError && 'status' in studentsError && studentsError.data}</p>}
          {isErrorAssignments &&
            <p>Error! {assignmentsError && 'status' in assignmentsError && assignmentsError.data}</p>}
          {students && filteredAssignments &&
            <>
              <h2 className={'text-xl font-semibold my-5'}>Assignment Performance</h2>
              <TeamVisual graphData={teamGraphData}/>
            </>
          }
          <h2 className={'text-xl font-semibold my-5'}>Students</h2>
          {students && studentsAnalyses && filteredAssignments &&
            <>
              <ul className={'grid grid-cols-auto-flow-grid grid-flow-row-dense gap-4'}>
                {students.map(student =>
                  <StudentTeamVisual
                    key={`enrollment-${student.id}`}
                    student={student}
                    graphData={teamGraphData.filter(data => data.id === student.name)}
                    analysisData={studentsAnalyses.find(studentsAnalysis => studentsAnalysis.studentId === student.id)}
                    selected={selectedStudentFromAnalysis === student.id}
                  />
                )}
              </ul>
            </>
          }
          {(!students || students.length <= 0) && <p>Looks like there are no students</p>}
        </div>
        <div className={'mt-6 md:mt-0 md:px-4 md:pb-4 w-full md:w-72 border-t border-t-gray-200 md:border-t-0 md:border-l md:border-l-gray-200 md:max-h-screen sticky top-0 overflow-y-auto'}>
          <h2 className={'text-xl font-semibold my-5'}>Analysis Details</h2>
          <div className={'flex flex-col gap-3 mt-4'}>
            {studentsAnalyses.map((studentAnalysis, index) =>
              <StudentAnalysisDetails
                key={`analysis-${studentAnalysis.studentId}-${index}`}
                analysis={studentAnalysis}
                student={students?.find(student => student.id === studentAnalysis.studentId)}
                setSelectedStudentFromAnalysis={setSelectedStudentFromAnalysis}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
