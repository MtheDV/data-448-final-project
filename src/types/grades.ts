export type Assignment = {
  id: number;
  name: string;
  grade: number;
}

export type Submission = {
  id: number;
  assignment: Assignment;
  grade: number;
}
