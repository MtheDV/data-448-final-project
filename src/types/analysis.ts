import {analysisTypeNegative, analysisTypeNeutral, analysisTypePositive} from '../constants';

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
  overallType: AnalysisType,
  overallScore: number,
  details: Array<{
    assignmentId: number,
    optional?: boolean,
    type: AnalysisType,
    results: string,
    grade: number
  }>,
}

export type AnalysisType = typeof analysisTypePositive | typeof analysisTypeNegative | typeof analysisTypeNeutral;
