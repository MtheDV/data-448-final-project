type routesType = {
  home: string,
  teams: string,
  teamsWithId: string,
  _404: string
}

const routes: routesType = {
  home: '/',
  teams: '/teams',
  teamsWithId: '/teams/:teamId',
  _404: '*'
};

export default routes;
