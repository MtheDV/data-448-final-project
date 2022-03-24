import {render} from '../../tests/utils';
import StudentTeamVisual from './StudentTeamVisual';
import {mockTeamEnrollments} from '../../api/mocks';
import {screen} from '@testing-library/react';
import {getTeamAssignments} from '../../api/mocks/utils';
import {filterAssignmentsForStudent, getAverageAssignmentsGrade} from '../../utils';


describe('Student Team Visual Component', () => {
  const mockEnrollment = mockTeamEnrollments[0];
  const mockStudent = mockEnrollment.student;
  const teamAssignments = getTeamAssignments(mockEnrollment.teamSetId, mockEnrollment.teamId, true);
  
  beforeEach(() => {
    render(<StudentTeamVisual student={mockStudent}  teamAssignments={teamAssignments}/>);
  });
  
  it('should render with level 3 name', () => {
    expect(screen.getByRole('heading', {level: 3}).innerHTML === mockStudent.name).toBeTruthy();
  });
  
  it('should render with average assignments grade', () => {
    const studentAssignments = filterAssignmentsForStudent(mockStudent.id, teamAssignments);
    const averageAssignmentsGrade = getAverageAssignmentsGrade(studentAssignments);
    expect(screen.getByText(`${averageAssignmentsGrade.toFixed(1)}%`)).toBeInTheDocument();
  });
});
