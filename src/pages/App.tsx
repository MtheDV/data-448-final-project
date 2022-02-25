import {Outlet} from 'react-router-dom';
import {Header, SidebarNav, Footer} from '../components';

function App() {
  return (
    <>
      <Header/>
      <SidebarNav/>
      <Outlet/>
      <Footer/>
    </>
  );
}

export default App;
