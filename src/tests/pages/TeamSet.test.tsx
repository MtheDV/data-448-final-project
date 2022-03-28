import {render} from '../utils';
import {TeamSet} from '../../pages';
import {screen, waitForElementToBeRemoved} from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import {routes} from '../../routing';
import {getTeams} from '../../api/mocks/utils';
import {mockTeamSets} from '../../api/mocks';

describe('Team Set Page', () => {
  const mockTeamSet = mockTeamSets[0];
  
  beforeEach(async () => {
    render(
      <Routes>
        <Route path={routes.teamSet} element={<TeamSet/>}/>
      </Routes>,
      [`/team-sets/${mockTeamSet.id}`]
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Loading\.\.\./i));
  });
  
  it('should display name in level 1 heading', async () => {
    expect(screen.getByRole('heading', {level: 1}).innerHTML === mockTeamSet.name).toBeTruthy();
    
  });
  
  it('should display teams overall graph', () => {
    expect(document.getElementById('teams-graph-display')?.innerHTML).toBeTruthy();
  });
  
  it('should display teams', async () => {
    const teams = getTeams(mockTeamSet.id);
    teams.forEach(team => {
      expect(screen.getByText(team.name)).toBeInTheDocument();
    });
  });
});
