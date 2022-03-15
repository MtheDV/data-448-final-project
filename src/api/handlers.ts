import {rest} from 'msw';
// import studentsJSON from './mocks/students.json';
import teamSetsJSON from './mocks/teamSets.json';
import teamsJSON from './mocks/teams.json';
import teamEnrollmentsJSON from './mocks/teamEnrollments.json';
import {Team, TeamEnrollment} from '../types';

export const handlers = [
  rest.get('/api/team-sets', (req, res, context) => {
    return res(
      context.delay(),
      context.status(200),
      context.json(teamSetsJSON)
    );
  }),
  rest.get('/api/team-sets/:teamSetId', (req, res, context) => {
    const {teamSetId} = req.params;
    const teamSet = teamSetsJSON.find(teamSet => teamSet.id === Number(teamSetId));
    if (teamSet) {
      return res(
        context.delay(),
        context.status(200),
        context.json(teamSet)
      );
    }
    
    return res(
      context.delay(),
      context.status(404),
      context.json('Unable to find team set specified')
    );
  }),
  rest.get('/api/team-sets/:teamSetId/teams', (req, res, context) => {
    const {teamSetId} = req.params;
    const teams: Array<Team> = [];
    teamsJSON.forEach(team => {
      if (team.teamSetId === Number(teamSetId)) {
        teams.push(team);
      }
    });
    return res(
      context.delay(),
      context.status(200),
      context.json(teams ?? [])
    );
  }),
  rest.get('/api/team-sets/:teamSetId/teams/:teamId', (req, res, context) => {
    const {teamSetId, teamId} = req.params;
    const teams: Array<Team> = [];
    teamsJSON.forEach(team => {
      if (team.teamSetId === Number(teamSetId)) {
        teams.push(team);
      }
    });
    const team = teams?.find(team => team.id === Number(teamId));
    if (team) {
      return res(
        context.delay(),
        context.status(200),
        context.json(team)
      );
    }
    
    return res(
      context.delay(),
      context.status(404),
      context.json('Unable to find the team')
    );
  }),
  rest.get('/api/team-sets/:teamSetId/teams/:teamId/enrollments', (req, res, context) => {
    const {teamSetId, teamId} = req.params;
    const enrollments: Array<TeamEnrollment> = [];
    teamEnrollmentsJSON.forEach(enrollment => {
      if (enrollment.teamId === Number(teamId) && enrollment.teamSetId === Number(teamSetId)) {
        enrollments.push(enrollment);
      }
    });
    if (enrollments) {
      return res(
        context.delay(),
        context.status(200),
        context.json(enrollments)
      );
    }
    
    return res(
      context.delay(),
      context.status(404),
      context.json('Unable to find enrollments')
    );
  })
];

export const getTeamSetsError = rest.get('/api/team-sets', (req, res, context) => {
  return res(
    context.delay(),
    context.status(500)
  );
});
