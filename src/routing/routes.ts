const home = '/';
const teamSets = '/team-sets';
const teamSet = teamSets + '/:teamSetId';
const teamSetTeam = teamSet + '/teams/:teamId';
const _404 = '*';

const routes = {
  home,
  teamSets,
  teamSet,
  teamSetTeam,
  _404
};

export default routes;
