import SidebarNavStyles from './SidebarNav.module.scss';
import {NavLink} from 'react-router-dom';
import {useCallback} from 'react';
import {routes} from '../../routing';

const SidebarNav = () => {
  const navLinkStyles = useCallback(({isActive}: { isActive: boolean }): string => {
    return isActive ? SidebarNavStyles.sidebarNav_nav_active : SidebarNavStyles.sidebarNav_nav_inActive;
  }, []);
  
  return (
    <aside className={SidebarNavStyles.sidebarNav}>
      <span>App</span>
      <nav>
        <ul>
          <li>
            <NavLink to={routes.home} className={navLinkStyles}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.teamSets} className={navLinkStyles}>
              Team Sets
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarNav;
