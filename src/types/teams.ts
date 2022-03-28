import {TeamEnrollment} from './enrollments';

export type TeamSet = {
  id: number,
  name: string,
  courseId: number
}

export type Team = {
  id: number,
  name: string,
  teamSetId: number,
  enrollments: Array<TeamEnrollment>
}
