export type AnalysisTeamAssignmentsDetails = {
  teamId: number,
  averageGrade: number,
  type: AnalysisType,
  results: string,
  details: Array<AnalysisStudentAssignmentsDetails>
}
export type AnalysisStudentAssignmentsDetails = {
  studentId: number,
  averageGrade: number,
  details: Array<{
    assignmentId: number,
    optional?: boolean,
    type: AnalysisType,
    results: string,
    grade: number
  }>,
}

export type AnalysisType = 'positive' | 'negative' | 'neutral';
