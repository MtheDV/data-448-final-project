import {Team} from './teams';
import {Student} from './students';

export type Enrollment = {
  id: number,
  team: Team,
  student: Student
}
