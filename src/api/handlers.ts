import {rest} from 'msw';
import {mockTeamSets, mockTeamSetTeams} from '../mocks/teams';

export const handlers = [
  rest.get('/api/team-sets', (req, res, context) => {
    return res(
      context.delay(),
      context.status(200),
      context.json(mockTeamSets)
    );
  }),
  rest.get('/api/team-sets/:teamSetId', (req, res, context) => {
    const {teamSetId} = req.params;
    const teamSet = mockTeamSets.find(teamSet => teamSet.id === Number(teamSetId));
    if (teamSet) {
      return res(
        context.delay(),
        context.status(200),
        context.json(teamSet)
      );
    } else {
      return res(
        context.delay(),
        context.status(404),
        context.json('Unable to find team set specified')
      );
    }
  }),
  rest.get('/api/team-sets/:teamSetId/teams', (req, res, context) => {
    const {teamSetId} = req.params;
    const teams = mockTeamSetTeams.find(teamSetTeams => teamSetTeams[0].teamSetId === Number(teamSetId));
    return res(
      context.delay(),
      context.status(200),
      context.json(teams ?? [])
    );
  }),
  rest.get('/api/team-sets/:teamSetId/teams/:teamId', (req, res, context) => {
    const {teamSetId, teamId} = req.params;
    const teams = mockTeamSetTeams.find(teamSetTeams => teamSetTeams[0].teamSetId === Number(teamSetId));
    const team = teams?.find(team => team.id === Number(teamId));
    if (team) {
      return res(
        context.delay(),
        context.status(200),
        context.json(team)
      );
    } else {
      return res(
        context.delay(),
        context.status(404),
        context.json('Unable to find the team')
      );
    }
  })
];

export const getTeamSetsError = rest.get('/api/team-sets', (req, res, context) => {
  return res(
    context.delay(),
    context.status(500)
  );
});
