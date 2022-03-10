import {Team} from './teams';
import {Student} from './students';

export type TeamEnrollment = {
  id: number,
  team: Team,
  student: Student
}
