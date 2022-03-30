import {NavLink} from 'react-router-dom';
import {ReactElement, useCallback} from 'react';
import {routes} from '../../routing';

const SidebarNav = () => {
  const CustomNavLink = useCallback((route: string, text: string): ReactElement => {
    const navLinkStyles = ({isActive}: { isActive: boolean }): string => {
      const defaultStyle = 'flex py-1 px-2 hover:bg-gray-100 hover:text-black hover:font-semibold rounded';
      return `${defaultStyle} ${isActive ? 'text-black font-semibold bg-gray-100' : 'text-gray-500'}`;
    };
    
    return (
      <NavLink to={route} className={navLinkStyles}>
        {text}
      </NavLink>
    );
  }, []);
  
  return (
    <aside className={'w-64 h-screen border-r border-r-gray-100 p-3 sticky top-0'}>
      <div className={'flex items-center'}>
        <div className={'w-8 h-8 rounded-full bg-gray-400 mr-3'}/>
        <span className={'text-2xl font-bold'}>Team Viz</span>
      </div>
      <nav className={'mt-5'}>
        <ul className={'flex flex-col gap-2'}>
          <li>
            {CustomNavLink(routes.home, 'Home')}
          </li>
          <li>
            {CustomNavLink(routes.teamSets, 'Team Sets')}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarNav;
