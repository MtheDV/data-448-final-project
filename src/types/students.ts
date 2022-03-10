import {Submission} from './grades';

export type Student = {
  id: number,
  name: string,
  submissions: Array<Submission>
}
