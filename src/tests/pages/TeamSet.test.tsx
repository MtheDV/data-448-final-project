import {render} from '../utils';
import {TeamSet} from '../../pages';
import {screen, waitForElementToBeRemoved} from '@testing-library/react';
import {mockTeamSet1, mockTeamSetTeams} from '../../mocks/teams';
import {Route, Routes} from 'react-router-dom';
import {routes} from '../../routing';

describe('Team Set Page - Team Set Data', () => {
  const data = mockTeamSet1;
  
  beforeEach(async () => {
    render(
      <Routes>
        <Route path={routes.teamSet} element={<TeamSet/>}/>
      </Routes>,
      [`/team-sets/${data.id}`]
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Loading\.\.\./i));
  });
  
  it('should display name in level 1 heading', async () => {
    expect(screen.getByRole('heading', {level: 1}).innerHTML === data.name).toBeTruthy();
  });
});

describe('Team Set Page - Teams Data', () => {
  const data = mockTeamSet1;
  
  beforeEach(async () => {
    render(
      <Routes>
        <Route path={routes.teamSet} element={<TeamSet/>}/>
      </Routes>,
      [`/team-sets/${data.id}`]);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading teams\.\.\./i));
  });
  
  it('should display teams as level 2 headings', async () => {
    const teams = mockTeamSetTeams.find(teamSetTeams => teamSetTeams[0].teamSetId === data.id);
    const headings = screen.queryAllByRole('heading', {level: 2});
    headings.forEach(heading => {
      expect(teams?.find(team => team.name === heading.innerHTML)).toBeTruthy();
    });
  });
});
