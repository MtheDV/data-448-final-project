import {NavLink} from 'react-router-dom';
import {ReactElement, useCallback} from 'react';
import {routes} from '../../routing';
import {HomeIcon, UserGroupIcon} from '@heroicons/react/outline';

const SidebarNav = () => {
  const CustomNavLink = useCallback((route: string, text: string, Icon?: ReactElement): ReactElement => {
    const navLinkStyles = ({isActive}: { isActive: boolean }): string => {
      const defaultStyle = 'flex items-center py-2 px-3 hover:bg-gray-100 hover:text-black hover:font-semibold rounded';
      return `${defaultStyle} ${isActive ? 'text-black font-semibold bg-gray-100' : 'text-gray-500'}`;
    };
    
    return (
      <NavLink to={route} className={navLinkStyles}>
        {Icon !== undefined &&
          <span className={'w-5 h-5 mr-3'}>
            {Icon}
          </span>
        }
        {text}
      </NavLink>
    );
  }, []);
  
  return (
    <aside className={'w-64 h-screen border-r border-r-gray-200 p-3 sticky top-0'}>
      <div className={'flex items-center'}>
        <div className={'w-7 h-7 rounded-full bg-gray-400 mr-3'}/>
        <span className={'text-2xl font-bold'}>Team Viz</span>
      </div>
      <nav className={'mt-5'}>
        <ul className={'flex flex-col gap-2'}>
          <li>
            {CustomNavLink(routes.home, 'Home', <HomeIcon/>)}
          </li>
          <li>
            {CustomNavLink(routes.teamSets, 'Team Sets', <UserGroupIcon/>)}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarNav;
