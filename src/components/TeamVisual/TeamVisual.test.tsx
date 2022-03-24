import {render} from '../../tests/utils';
import TeamVisual from './TeamVisual';
import {mockTeams} from '../../api/mocks';
import {getEnrollments, getTeamAssignments} from '../../api/mocks/utils';

describe('Team Visual Component', () => {
  const mockTeam = mockTeams[0];
  const teamStudents = getEnrollments(mockTeam.teamSetId, mockTeam.id).map(enrollment => enrollment.student);
  const teamAssignments = getTeamAssignments(mockTeam.teamSetId, mockTeam.id, true);
  
  beforeEach(() => {
    render(<TeamVisual students={teamStudents} assignments={teamAssignments}/>);
  });
  
  it('should render', () => {
    expect(render(<TeamVisual students={teamStudents} assignments={teamAssignments}/>)).toBeTruthy();
  });
});
