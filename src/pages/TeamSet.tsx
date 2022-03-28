import {useParams} from 'react-router-dom';
import {useGetAssignmentsQuery, useGetTeamSetQuery, useGetTeamsQuery} from '../redux/slices/api/apiSlice';
import {TeamContainer} from '../components';
import Spinner from '../components/Spinner/Spinner';
import {useMemo} from 'react';
import {analyzeTeams} from '../utils/analyzeTeams';

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
  
  return (
    <div>
      {teamSet && <h1>{teamSet.name}</h1>}
      <Spinner isLoading={isLoadingTeamSet || isLoadingTeams}/>
      <hr/>
      {isErrorTeamSet && <p>Error! {teamSetError && 'status' in teamSetError && teamSetError.data}</p>}
      {isErrorTeams && <p>Error! {teamsError && 'status' in teamsError && teamsError.data}</p>}
      {isErrorAssignments && <p>Error! {assignmentsError && 'status' in assignmentsError && assignmentsError.data}</p>}
      {teams &&
        <>
          <h2>Teams</h2>
          <ul>
            {teams.map(team =>
              <TeamContainer key={`team-${team.id}`} team={team} teamAnalysis={teamsAnalyses.find(teamsAnalysis => teamsAnalysis.teamId === team.id)}/>
            )}
          </ul>
        </>
      }
      {(!teams || teams.length <= 0) && <p>Looks like there are no teams</p>}
    </div>
  );
};

export default TeamSet;
