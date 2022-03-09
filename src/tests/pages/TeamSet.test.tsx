import {render} from '../utils';
import {TeamSet} from '../../pages';
import {screen, waitForElementToBeRemoved} from '@testing-library/react';
import {mockTeamSet1} from '../../mocks/teams';
import {Route, Routes} from 'react-router-dom';
import {routes} from '../../routing';

describe('Team Set Page', () => {
  const data = mockTeamSet1;
  
  beforeEach(async () => {
    render(
      <Routes>
        <Route path={routes.teamSet} element={<TeamSet/>}/>
      </Routes>,
      [`/team-sets/${data.id}`]);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading\.\.\./i));
  });
  
  it('should display name in level 1 heading', async () => {
    expect(screen.getByRole('heading', {level: 1}).innerHTML === data.name).toBeTruthy();
  });
});
