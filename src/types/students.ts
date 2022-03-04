import {Enrollment} from './enrollments';

export type Student = {
  id: number,
  name: string,
  enrollments: Array<Enrollment>
}
