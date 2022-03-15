import {Student} from './students';

export type TeamEnrollment = {
  id: number,
  teamId: number,
  teamSetId: number,
  student: Student
}
