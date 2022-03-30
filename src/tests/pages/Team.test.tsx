import {render} from '../utils';
import {Team} from '../../pages';
import {screen, waitForElementToBeRemoved} from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import {routes} from '../../routing';
import {getTeamStudents} from '../../api/mocks/utils';
import {mockTeams} from '../../api/mocks';

describe('Team Page', () => {
  const mockTeam = mockTeams[0];
  
  beforeEach(async () => {
    render(
      <Routes>
        <Route path={routes.teamSetTeam} element={<Team/>}/>
      </Routes>,
      [`/team-sets/${mockTeam.teamSetId}/teams/${mockTeam.id}`]
    );
    await waitForElementToBeRemoved(screen.getByText(/Loading\.\.\./i));
  });
  
  it('should display name as level 1 heading', () => {
    expect(screen.getByRole('heading', {level: 1}).innerHTML === mockTeam.name).toBeTruthy();
  });
  
  it('should display students', () => {
    expect(screen.getByText(/Students/i)).toBeInTheDocument();
    const students = getTeamStudents(mockTeam.teamSetId, mockTeam.id);
    students.forEach(student => {
      expect(screen.getByText(student.name)).toBeInTheDocument();
    });
  });
});
