import {Team, TeamSet} from '../types';
import {mockCourse} from './course';

export const mockTeamSet1: TeamSet = {
  id: 1,
  name: 'Team Set 1',
  courseId: mockCourse.id
};

export const mockTeamSet2: TeamSet = {
  id: 2,
  name: 'Team Set 2',
  courseId: mockCourse.id
};

export const mockTeamSets: Array<TeamSet> = [mockTeamSet1, mockTeamSet2];

export const mockTeam1: Team = {
  id: 1,
  name: 'Test Team 1',
  teamSetId: mockTeamSet1.id
};

export const mockTeam2: Team = {
  id: 2,
  name: 'Test Team 2',
  teamSetId: mockTeamSet1.id
};

export const mockTeamSetTeams: Array<Array<Team>> = [
  [mockTeam1, mockTeam2]
];
