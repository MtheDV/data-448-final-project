import {render} from '../utils';
import {Team} from '../../pages';
import {screen, waitForElementToBeRemoved} from '@testing-library/react';
import {mockTeam1, mockTeamSet1} from '../../mocks/teams';
import {Route, Routes} from 'react-router-dom';
import {routes} from '../../routing';

describe('Team Page', () => {
  beforeEach(async () => {
    render(
      <Routes>
        <Route path={routes.teamSetTeam} element={<Team/>}/>
      </Routes>,
      [`/team-sets/${mockTeamSet1.id}/teams/${mockTeam1.id}`]
    );
    await waitForElementToBeRemoved(screen.getByText(/Loading\.\.\./i));
  });
  
  it('should display name as level 1 heading', () => {
    expect(screen.getByRole('heading', {level: 1}).innerHTML === mockTeam1.name).toBeTruthy();
  });
});
