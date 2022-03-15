import {TeamEnrollment} from '../types';
import {mockStudent1, mockStudent2} from './students';
import {mockTeam1, mockTeam2, mockTeamSet1} from './teams';

export const mockStudent1Team1Enrollment: TeamEnrollment = {
  id: 1,
  student: mockStudent1,
  teamId: mockTeam1.id,
  teamSetId: mockTeamSet1.id
};

export const mockTeam1Enrollments: Array<TeamEnrollment> = [mockStudent1Team1Enrollment];

export const mockStudent2Team2Enrollment: TeamEnrollment = {
  id: 2,
  student: mockStudent2,
  teamId: mockTeam2.id,
  teamSetId: mockTeamSet1.id
};

export const mockTeam2Enrollments: Array<TeamEnrollment> = [mockStudent2Team2Enrollment];
