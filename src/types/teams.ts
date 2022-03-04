import {Assignment} from './grades';
import {Enrollment} from './enrollments';

export type Team = {
  id: number,
  name: string,
  enrollments: Array<Enrollment>,
  assignments: Array<Assignment>
}

export type TeamSet = {
  id: number,
  name: string,
  teams: Array<Team>
}
