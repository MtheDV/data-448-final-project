import {useParams} from 'react-router-dom';
import {useGetAssignmentsQuery, useGetTeamSetQuery, useGetTeamsQuery} from '../redux/slices/api/apiSlice';
import {TeamContainer} from '../components';
import Spinner from '../components/Spinner/Spinner';
import {Fragment, useMemo, useState} from 'react';
import {analyzeTeams} from '../utils/analyzeTeams';
import {AnalysisType, GraphData} from '../types';
import {prepareTeamSetGraphData, toTitleCase} from '../utils';
import LineGraph from '../components/Graphs/LineGraph/LineGraph';
import TeamAnalysisDetails from '../components/TeamAnalysisDetails/TeamAnalysisDetails';
import {Listbox, Transition} from '@headlessui/react';
import {analysisTypes} from '../constants';
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';

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
  const teamsGraphData = useMemo<GraphData>(() => prepareTeamSetGraphData(teams ?? [], assignments ?? []), [teams, assignments]);
  
  const [analyticsFilterType, setAnalyticsFilterType] = useState<'all' | AnalysisType>('all');
  
  return (
    <>
      <div className={'flex justify-between items-center mb-5'}>
        <h1 className={'text-3xl font-bold'}>{teamSet?.name}</h1>
        <Spinner isLoading={isLoadingTeamSet || isLoadingTeams}/>
      </div>
      <hr/>
      <div className={'flex'}>
        <div className={'pr-4 flex-grow'}>
          {isErrorTeamSet && <p>Error! {teamSetError && 'status' in teamSetError && teamSetError.data}</p>}
          {isErrorTeams && <p>Error! {teamsError && 'status' in teamsError && teamsError.data}</p>}
          {isErrorAssignments &&
            <p>Error! {assignmentsError && 'status' in assignmentsError && assignmentsError.data}</p>}
          {teamsGraphData &&
            <>
              <h2 className={'text-xl font-semibold my-5'}>Team Performances</h2>
              <div id={'teams-graph-display'} className={'h-72 p-4 border border-gray-400 rounded-lg'}>
                <LineGraph
                  data={teamsGraphData}
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
                {teams.map(team =>
                  <TeamContainer
                    key={`team-${team.id}`}
                    team={team}
                    teamAnalysis={teamsAnalyses.find(teamsAnalysis => teamsAnalysis.teamId === team.id)}
                  />
                )}
              </ul>
            </>
          }
          {(!teams || teams.length <= 0) && <p>Looks like there are no teams</p>}
        </div>
        <div className={'pl-4 w-64 border-l border-l-gray-200'}>
          <h2 className={'text-xl font-semibold my-5'}>Analysis Details</h2>
          <label>
            <span className={'text-sm'}>Filter</span>
            <Listbox value={analyticsFilterType} onChange={setAnalyticsFilterType}>
              <div className={'relative'}>
                <Listbox.Button
                  className={'flex justify-between items-center w-full py-2 px-3 border border-gray-400 rounded-lg text-left'}
                >
                  <span className={'block truncate'}>{toTitleCase(analyticsFilterType)}</span>
                  <SelectorIcon className={'w-5 h-5 text-gray-400'} aria-hidden={true}/>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave={'transition ease-in duration-100'}
                  leaveFrom={'opacity-100'}
                  leaveTo={'opacity-0'}
                >
                  <Listbox.Options
                    className={'absolute w-full py-2 mt-1 overflow-auto text-base bg-white rounded-md border border-gray-400 shadow'}>
                    <Listbox.Option
                      value={'all'}
                      className={({active}) => `flex items-center px-2 py-1 ${active ? 'bg-gray-200' : ''}`}
                    >
                      {({selected}) =>
                        <>
                          {selected &&
                            <CheckIcon className={'w-4 h-4 text-gray-400 mr-2'}/>
                          }
                          <span>All</span>
                        </>
                      }
                    </Listbox.Option>
                    {analysisTypes.map(type =>
                      <Listbox.Option
                        key={type}
                        value={type}
                        className={({active}) => `flex items-center px-2 py-1 ${active ? 'bg-gray-200' : ''}`}
                      >
                        {({selected}) =>
                          <>
                            {selected &&
                              <CheckIcon className={'w-4 h-4 text-gray-400 mr-2'}/>
                            }
                            <span>{toTitleCase(type)}</span>
                          </>
                        }
                      </Listbox.Option>
                    )}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </label>
          {teamsAnalyses.map((teamAnalysis, index) =>
            (analyticsFilterType === 'all' || teamAnalysis.type === analyticsFilterType) &&
            <TeamAnalysisDetails
              key={`analysis-${teamAnalysis.teamId}-${index}`}
              analysis={teamAnalysis}
              team={teams?.find(team => team.id === teamAnalysis.teamId)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TeamSet;
