import { rest } from 'msw';
import {mockTeam1, mockTeamSet} from './teams';

export const handlers = [
  rest.post('/api/teams-sets/1', (req, res, context) => {
    return res(
      context.status(200),
      context.json({
        teamsSet: mockTeamSet
      })
    );
  }),
  rest.post('/api/teams/1', (req, res, context) => {
    return res(
      context.status(200),
      context.json({
        team: mockTeam1
      })
    );
  })
];
