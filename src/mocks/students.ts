import {Student} from '../types';
import {mockStudent1Enrollment, mockStudent2Enrollment} from './enrollments';

export const mockStudent1: Student = {
  id: 1,
  name: 'Student 1',
  enrollments: [mockStudent1Enrollment]
};

export const mockStudent2: Student = {
  id: 2,
  name: 'Student 2',
  enrollments: [mockStudent2Enrollment]
};
