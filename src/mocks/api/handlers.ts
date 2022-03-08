import {rest} from 'msw';
import {mockTeam1, mockTeamSets} from '../teams';
import {baseURL} from '../../api/axiosConfig';

export const handlers = [
  rest.get(baseURL + '/api/team-sets', (req, res, context) => {
    return res(
      context.delay(),
      context.status(200),
      context.json({
        teamSets: mockTeamSets
      })
      // context.status(404),
      // context.json({
      //   message: 'Unable to find team sets'
      // })
    );
  }),
  rest.get(baseURL + '/api/team-sets/:teamSetId', (req, res, context) => {
    const {teamSetId} = req.params;
    const teamSet = mockTeamSets.find(teamSet => teamSet.id === Number(teamSetId));
    if (teamSet) {
      return res(
        context.delay(),
        context.status(200),
        context.json({
          teamsSet: teamSet
        })
      );
    } else {
      return res(
        context.status(404),
        context.json({
          message: 'Unable to find team set specified'
        })
      );
    }
  }),
  rest.get(baseURL + '/api/teams/1', (req, res, context) => {
    return res(
      context.delay(),
      context.status(200),
      context.json({
        team: mockTeam1
      })
    );
  })
];

export const getTeamSetsError = rest.get(baseURL + '/api/team-sets', (req, res, context) => {
  return res(
    context.status(500)
  );
});
