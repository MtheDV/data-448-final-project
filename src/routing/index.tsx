import {Route, Routes} from 'react-router-dom';
import {App, Teams, Team, _404} from '../pages';

const Index = () => {
  return (
    <Routes>
      <Route path={'/'} element={<App/>}>
        <Route path={'/teams'} element={<Teams/>}/>
        <Route path={'/teams/:teamId'} element={<Team/>}/>
        <Route path={'*'} element={<_404/>}/>
      </Route>
    </Routes>
  );
};

export default Index;
