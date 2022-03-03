import {Route, Routes} from 'react-router-dom';
import {_404, App, Team, Teams} from '../pages';
import {routes} from './index';
import Home from '../pages/Home';

const Routing = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<App/>}>
        <Route path={routes.teams} element={<Teams/>}/>
        <Route path={routes.teamsWithId} element={<Team/>}/>
        <Route path={routes._404} element={<_404/>}/>
        <Route index element={<Home/>}/>
      </Route>
    </Routes>
  );
};

export default Routing;
