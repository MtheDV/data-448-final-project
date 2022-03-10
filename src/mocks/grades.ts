import {Assignment} from '../types';
import {Submission} from '../types/grades';
import {mockStudent1, mockStudent2} from './students';

export const mockSubmissionStudent1: Submission = {
  id: 1,
  grade: 15,
  studentId: mockStudent1.id
};

export const mockSubmissionStudent2: Submission = {
  id: 1,
  grade: 20,
  studentId: mockStudent2.id
};

export const mockAssignment1: Assignment = {
  id: 1,
  name: 'Assignment 1',
  grade: 20,
  submissions: [mockSubmissionStudent1, mockSubmissionStudent2]
};
