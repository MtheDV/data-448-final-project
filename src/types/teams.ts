import {Assignment} from './grades';
import {Enrollment} from './students';

export type Team = {
  id: number;
  name: string;
  enrollments: Array<Enrollment>;
  assignments: Array<Assignment>;
}
