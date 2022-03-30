import {Outlet} from 'react-router-dom';
import {Header, SidebarNav, Footer} from '../components';

function App() {
  return (
    <div className={'flex flex-row h-full'}>
      <SidebarNav/>
      <div className={'flex flex-col w-full'}>
        <Header/>
        <main className={'flex-grow p-5'}>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
