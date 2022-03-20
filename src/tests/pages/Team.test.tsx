import {render} from '../utils';
import {Team} from '../../pages';
import {screen, waitForElementToBeRemoved} from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import {routes} from '../../routing';
import {getEnrollments, getTeamAssignments} from '../../api/mocks/utils';
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
  
  it('should display users section', () => {
    expect(screen.getByText(/Students/i)).toBeInTheDocument();
    const enrollments = getEnrollments(mockTeam.teamSetId, mockTeam.id);
    enrollments.forEach(enrollment => {
      expect(screen.getByText(enrollment.student.name)).toBeInTheDocument();
    });
  });
  
  it('should display assignments section', () => {
    expect(screen.getByText(/Assignments/i)).toBeInTheDocument();
    const assignments = getTeamAssignments(mockTeam.teamSetId, mockTeam.id, true);
    assignments.forEach(assignment => {
      expect(screen.getByText(assignment.name)).toBeInTheDocument();
    });
  });
});
