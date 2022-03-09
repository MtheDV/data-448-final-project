import {Enrollment} from '../types';
import {mockTeam1} from './teams';
import {mockStudent1, mockStudent2} from './students';

export const mockStudent1Enrollment: Enrollment = {
  id: 1,
  team: mockTeam1,
  student: mockStudent1
};

export const mockStudent2Enrollment: Enrollment = {
  id: 2,
  team: mockTeam1,
  student: mockStudent2
};
