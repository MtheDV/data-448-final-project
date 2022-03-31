import {render} from '../../tests/utils';
import StudentTeamVisual from './StudentTeamVisual';
import {mockStudents} from '../../api/mocks';
import {screen} from '@testing-library/react';
import {filterAssignmentsForStudent, getAverageAssignmentsGrade} from '../../utils';
import {getAssignments} from '../../api/mocks/utils';

describe('Student Team Visual Component', () => {
  const mockStudent = mockStudents[0];
  const teamAssignments = getAssignments(true);
  const studentAssignments = filterAssignmentsForStudent(mockStudent.id, teamAssignments);
  const averageAssignmentsGrade = getAverageAssignmentsGrade(studentAssignments);
  
  beforeEach(() => {
    render(<StudentTeamVisual student={mockStudent} analysisData={{studentId: mockStudent.id, averageGrade: averageAssignmentsGrade, details: []}} graphData={[]} selected={false}/>);
  });
  
  it('should render with level 3 name', () => {
    expect(screen.getByRole('heading', {level: 3}).innerHTML === mockStudent.name).toBeTruthy();
  });
  
  it('should render with average assignments grade', () => {
    expect(screen.getByText(`${averageAssignmentsGrade.toFixed(1)}%`)).toBeInTheDocument();
  });
});
