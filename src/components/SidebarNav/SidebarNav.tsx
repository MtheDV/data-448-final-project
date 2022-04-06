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
    <aside className={'flex flex-row items-center w-full bg-white z-50 p-3 sticky top-0 border-b border-b-gray-200 md:flex-col md:items-start md:w-64 md:h-screen md:border-b-0 md:border-r md:border-r-gray-200'}>
      <div className={'flex items-center'}>
        <div className={'w-7 h-7 rounded-full bg-gray-400 mr-3'}/>
        <span className={'text-2xl font-bold'}>Team Viz</span>
      </div>
      <nav className={'ml-auto md:ml-0 md:mt-5 md:w-full'}>
        <ul className={'flex flex-row md:flex-col gap-2'}>
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
