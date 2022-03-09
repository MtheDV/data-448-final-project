import {rest} from 'msw';
import {mockTeam1, mockTeamSets} from '../mocks/teams';

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
        context.status(404),
        context.json('Unable to find team set specified')
      );
    }
  }),
  rest.get('/api/team-sets/:teamSetId/teams', (req, res, context) => {
    return res(
      context.delay(),
      context.status(200),
      context.json({
        team: mockTeam1
      })
    );
  })
];

export const getTeamSetsError = rest.get('/api/team-sets', (req, res, context) => {
  return res(
    context.status(500)
  );
});
