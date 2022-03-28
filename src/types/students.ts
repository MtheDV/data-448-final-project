import {TeamEnrollment} from './enrollments';

export type Student = {
  id: number,
  studentId: string,
  name: string
  enrollments: Array<TeamEnrollment>
}
