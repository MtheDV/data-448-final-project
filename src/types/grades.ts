import {Team} from './teams';

export type Assignment = {
  id: number,
  team: Team,
  name: string,
  grade: number
}

export type Submission = {
  id: number,
  team: Team,
  assignment: Assignment,
  grade: number
}
