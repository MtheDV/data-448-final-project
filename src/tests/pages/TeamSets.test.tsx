import {render} from '../utils';
import {screen, waitForElementToBeRemoved} from '@testing-library/react';
import {mockTeamSets} from '../../mocks/teams';
import {server} from '../../mocks/api/server';
import {getTeamSetsError} from '../../mocks/api/handlers';
import userEvent from '@testing-library/user-event';
import {TeamSets, TeamSet} from '../../pages';
import {Routes, Route} from 'react-router-dom';
import {routes} from '../../routing';

describe('Team Sets Page', () => {
  
  beforeEach(async () => {
    render(
      <Routes>
        <Route path={routes.teamSets} element={<TeamSets/>}/>
        <Route path={routes.teamSet} element={<TeamSet/>}/>
      </Routes>,
      ['/team-sets']);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading\.\.\./i));
  });
  
  it('should show team sets', async () => {
    mockTeamSets.forEach(teamSet => {
      expect(screen.getByText(teamSet.name)).toBeInTheDocument();
    });
  });
  
  mockTeamSets.forEach(teamSet => {
    it('should go to team set page when clicking team set', async () => {
      userEvent.click(screen.getByText(teamSet.name));
      expect(screen.getByRole('heading', {level: 1}).innerHTML === `Team Set ${teamSet.id}`).toBeTruthy();
    });
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
});
