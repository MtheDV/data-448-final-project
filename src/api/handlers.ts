import {rest} from 'msw';
import {
  getCourse,
  getCourses,
  getEnrollments,
  getTeam,
  getTeamAssignments,
  getTeams,
  getTeamSet,
  getTeamSets
} from './mocks/utils';

export const handlers = [
  rest.get('/api/team-sets', (req, res, context) => {
    return res(
      context.delay(),
      context.status(200),
      context.json(getTeamSets())
    );
  }),
  rest.get('/api/team-sets/:teamSetId', (req, res, context) => {
    const {teamSetId} = req.params;
    const teamSet = getTeamSet(Number(teamSetId));
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
    const teams = getTeams(Number(teamSetId));
    return res(
      context.delay(),
      context.status(200),
      context.json(teams)
    );
  }),
  rest.get('/api/team-sets/:teamSetId/teams/:teamId', (req, res, context) => {
    const {teamSetId, teamId} = req.params;
    const team = getTeam(Number(teamSetId), Number(teamId));
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
    const enrollments = getEnrollments(Number(teamSetId), Number(teamId));
    return res(
      context.delay(),
      context.status(200),
      context.json(enrollments)
    );
  }),
  rest.get('/api/team-sets/:teamSetId/teams/:teamId/assignments', (req, res, context) => {
    const {teamSetId, teamId} = req.params;
    const includeSubmissions = req.url.searchParams.get('submissions') === 'true';
    const assignments = getTeamAssignments(Number(teamSetId), Number(teamId), includeSubmissions);
    return res(
      context.delay(),
      context.status(200),
      context.json(assignments)
    );
  }),
  rest.get('/api/courses', (req, res, context) => {
    return res(
      context.delay(),
      context.status(200),
      context.json(getCourses())
    );
  }),
  rest.get('/api/courses/:courseId', (req, res, context) => {
    const {courseId} = req.params;
    const course = getCourse(Number(courseId));
    if (course) {
      return res(
        context.delay(),
        context.status(200),
        context.json(course)
      );
    }
    
    return res(
      context.delay(),
      context.status(404),
      context.json('Unable to find course')
    );
  })
];

export const getTeamSetsError = rest.get('/api/team-sets', (req, res, context) => {
  return res(
    context.delay(),
    context.status(500)
  );
});
