import {Submission} from './grades';

export type Student = {
  id: number;
  name: string;
  enrollments: Array<Enrollment>;
}

export type Enrollment = {
  id: number;
  student: Student;
  submissions: Array<Submission>;
}
