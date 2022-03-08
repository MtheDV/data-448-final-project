const home = '/';
const teamSets = '/team-sets';
const teamSet = teamSets + '/:teamSetId';
const teamSet_teams = teamSet + '/teams';
const teamSet_team = teamSet_teams + '/:teamId';
const _404 = '*';

const routes = {
  home,
  teamSets,
  teamSet,
  teamSet_teams,
  teamSet_team,
  _404
};

export default routes;
