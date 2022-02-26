import {Outlet} from 'react-router-dom';
import {Header, SidebarNav, Footer} from '../components';
import AppStyles from '../styles/App.module.scss';

function App() {
  return (
    <div className={AppStyles.app}>
      <SidebarNav/>
      <div className={AppStyles.appContent}>
        <Header/>
        <main className={AppStyles.appContent_main}>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
