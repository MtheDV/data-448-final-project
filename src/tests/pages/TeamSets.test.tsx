import {render} from '../utils';
import {screen, waitForElementToBeRemoved} from '@testing-library/react';
import {server} from '../../api/server';
import {getTeamSetsError} from '../../api/handlers';
import userEvent from '@testing-library/user-event';
import {TeamSets, TeamSet} from '../../pages';
import {Routes, Route} from 'react-router-dom';
import {routes} from '../../routing';
import {getTeamSets} from '../../api/mocks/utils';
import {mockTeamSets} from '../../api/mocks';

describe('Team Sets Page', () => {
  beforeEach(async () => {
    render(
      <Routes>
        <Route path={routes.teamSets} element={<TeamSets/>}/>
        <Route path={routes.teamSet} element={<TeamSet/>}/>
      </Routes>,
      ['/team-sets']
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Loading\.\.\./i));
  });
  
  it('should show team sets', async () => {
    getTeamSets().forEach(teamSet => {
      expect(screen.getByText(teamSet.name)).toBeInTheDocument();
    });
  });
  
  it('should go to team set page when clicking team set', async () => {
    const teamSet = mockTeamSets[0];
    userEvent.click(screen.getByText(teamSet.name));
    await waitForElementToBeRemoved(() => screen.getByText(/Loading\.\.\./i));
    expect(screen.getByRole('heading', {level: 1}).innerHTML === teamSet.name).toBeTruthy();
  });
});

describe('Team Sets Page Error', () => {
  beforeEach(async () => {
    server.use(getTeamSetsError);
    render(<TeamSets/>, ['/team-sets']);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading\.\.\./i));
  });
  
  it('should render error', () => {
    expect(screen.getByText(/Error!/i)).toBeInTheDocument();
  });
  
  it('should display no team sets message', () => {
    expect(screen.getByText(/Looks like there are no team sets/i)).toBeInTheDocument();
  });
});
