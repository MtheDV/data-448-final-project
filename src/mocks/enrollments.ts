import {TeamEnrollment} from '../types';
import {mockStudent1, mockStudent2} from './students';
import {mockTeam1, mockTeam2} from './teams';

export const mockStudent1Enrollment: TeamEnrollment = {
  id: 1,
  student: mockStudent1,
  team: mockTeam1
};

export const mockStudent2Enrollment: TeamEnrollment = {
  id: 2,
  student: mockStudent2,
  team: mockTeam2
};
