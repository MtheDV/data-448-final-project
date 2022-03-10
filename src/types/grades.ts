export type Assignment = {
  id: number,
  name: string,
  grade: number,
  submissions: Array<Submission>
}

export type Submission = {
  id: number,
  studentId: number
  grade: number
}
