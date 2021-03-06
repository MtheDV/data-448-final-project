import {useParams} from 'react-router-dom';
import {useGetAssignmentsQuery, useGetTeamSetQuery, useGetTeamsQuery} from '../redux/slices/api/apiSlice';
import {TeamContainer} from '../components';
import Spinner from '../components/Spinner/Spinner';
import {useMemo, useState} from 'react';
import {analyzeTeams} from '../utils/analyzeTeams';
import {AnalysisType, LineGraphData} from '../types';
import {prepareTeamSetGraphData} from '../utils';
import LineGraph from '../components/Graphs/LineGraph/LineGraph';
import TeamAnalysisDetails from '../components/TeamAnalysisDetails/TeamAnalysisDetails';
import {analysisTypes} from '../constants';
import {Select} from '../components';

const TeamSet = () => {
  const {teamSetId} = useParams();
  const {
    data: teamSet,
    isLoading: isLoadingTeamSet,
    isError: isErrorTeamSet,
    error: teamSetError
  } = useGetTeamSetQuery(Number(teamSetId));
  const {
    data: teams,
    isLoading: isLoadingTeams,
    isError: isErrorTeams,
    error: teamsError
  } = useGetTeamsQuery(Number(teamSetId));
  const {
    data: assignments,
    isError: isErrorAssignments,
    error: assignmentsError
  } = useGetAssignmentsQuery(true);
  
  const teamsAnalyses = useMemo(() => analyzeTeams(teams ?? [], assignments ?? []), [teams, assignments]);
  const teamsGraphData = useMemo<LineGraphData>(() => prepareTeamSetGraphData(teams ?? [], assignments ?? []), [teams, assignments]);
  
  const [analyticsFilterType, setAnalyticsFilterType] = useState<'all' | AnalysisType>('all');
  const [selectedTeamFromAnalysis, setSelectedTeamFromAnalysis] = useState<number | undefined>(undefined);
  
  const filteredGraphData = useMemo<LineGraphData>(() => {
    return teamsGraphData.filter(data =>
      teams?.filter(team =>
        teamsAnalyses.filter(analysis =>
          analyticsFilterType === 'all' || analysis.type === analyticsFilterType)
          .find(analysis => analysis.teamId === team.id))
        .find(team => team.name === data.id)
    );
  }, [analyticsFilterType, teams, teamsAnalyses, teamsGraphData]);
  
  return (
    <>
      <div className={'flex justify-between items-center mb-5'}>
        <h1 className={'text-3xl font-bold'}>{teamSet?.name}</h1>
        <Spinner isLoading={isLoadingTeamSet || isLoadingTeams}/>
      </div>
      <hr/>
      <div className={'flex flex-col md:flex-row'}>
        <div className={'md:pr-4 flex-1'}>
          {isErrorTeamSet && <p>Error! {teamSetError && 'status' in teamSetError && teamSetError.data}</p>}
          {isErrorTeams && <p>Error! {teamsError && 'status' in teamsError && teamsError.data}</p>}
          {isErrorAssignments &&
            <p>Error! {assignmentsError && 'status' in assignmentsError && assignmentsError.data}</p>}
          {teamsGraphData &&
            <>
              <h2 className={'text-xl font-semibold my-5'}>Team Performances</h2>
              <div id={'teams-graph-display'} className={'h-72 p-4 border border-gray-400 rounded-lg'}>
                <LineGraph
                  data={filteredGraphData}
                  displayTooltip={'number'}
                  lineProps={{
                    margin: {top: 10, bottom: 10, right: 10, left: 30},
                    axisBottom: null,
                    enableSlices: false
                  }}
                />
              </div>
            </>
          }
          {teams &&
            <>
              <h2 className={'text-xl font-semibold my-5'}>Teams</h2>
              <ul className={'grid grid-cols-auto-flow-grid grid-flow-row-dense gap-4'}>
                {teams.filter(team => teamsAnalyses.filter(analysis => analyticsFilterType === 'all' || analysis.type === analyticsFilterType).find(analysis => analysis.teamId === team.id)).map(team =>
                  <TeamContainer
                    key={`team-${team.id}`}
                    team={team}
                    teamAnalysis={teamsAnalyses.find(teamsAnalysis => teamsAnalysis.teamId === team.id)}
                    selected={selectedTeamFromAnalysis === team.id}
                    setSelectedTeamFromAnalysis={setSelectedTeamFromAnalysis}
                  />
                )}
              </ul>
            </>
          }
          {(!teams || teams.length <= 0) && <p>Looks like there are no teams</p>}
        </div>
        <div className={'mt-6 md:mt-0 md:px-4 md:pb-4 w-full md:w-72 border-t border-t-gray-200 md:border-t-0 md:border-l md:border-l-gray-200 md:max-h-screen sticky top-0 overflow-y-auto'}>
          <h2 className={'text-xl font-semibold my-5'}>Analysis Details</h2>
          <label>
            <span className={'text-sm'}>Filter</span>
            <Select<typeof analyticsFilterType>
              value={analyticsFilterType}
              noneValue={'all'}
              values={analysisTypes}
              onChange={setAnalyticsFilterType}
            />
          </label>
          <div className={'flex flex-col gap-3 mt-4'}>
            {teamsAnalyses.map((teamAnalysis, index) =>
              (analyticsFilterType === 'all' || teamAnalysis.type === analyticsFilterType) &&
              <TeamAnalysisDetails
                key={`analysis-${teamAnalysis.teamId}-${index}`}
                analysis={teamAnalysis}
                team={teams?.find(team => team.id === teamAnalysis.teamId)}
                setSelectedTeamFromAnalysis={setSelectedTeamFromAnalysis}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamSet;
