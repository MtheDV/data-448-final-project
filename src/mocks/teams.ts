import {Team, TeamSet} from '../types';
import {mockStudent1Enrollment, mockStudent2Enrollment} from './enrollments';

export const mockTeam1: Team = {
  id: 1,
  name: 'Test Team 1',
  enrollments: [mockStudent1Enrollment, mockStudent2Enrollment],
  assignments: []
};

export const mockTeam2: Team = {
  id: 2,
  name: 'Test Team 2',
  enrollments: [],
  assignments: []
};

export const mockTeamSet: TeamSet = {
  id: 1,
  name: 'Team Set 1',
  teams: [mockTeam1, mockTeam2]
};

export const mockTeamSets: Array<TeamSet> = [mockTeamSet];
