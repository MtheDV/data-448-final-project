import {
  AnalysisStudentAssignmentsDetails,
  AnalysisTeamAssignmentsDetails,
  AnalysisType,
  Assignment,
  Team
} from '../types';
import {analysisTypeNegative, analysisTypeNeutral, analysisTypePositive} from '../constants';

export const analyzeTeams = (teams: Array<Team>, assignments: Array<Assignment>): Array<AnalysisTeamAssignmentsDetails> => {
  const teamsGrades: Array<number> = [];
  const teamsAnalyses: Array<AnalysisTeamAssignmentsDetails> = teams.map(team => {
    const {
      analyses: details,
      average: teamAverage
    } = analyzeStudents(team.enrollments.map(enrollment => enrollment.studentId), assignments);
    teamsGrades.push(teamAverage);
    
    return {
      teamId: team.id,
      averageGrade: teamAverage,
      type: analysisTypeNeutral,
      results: '',
      details: details,
    };
  });
  
  const teamsMean = teamsGrades.sort()[Math.floor(teamsGrades.length / 2)];
  const teamsGradesSTD = Math.sqrt(
    Math.pow(teamsGrades.reduce((previousValue, currentValue) => {
      return previousValue + (currentValue - teamsMean);
    }, 0), 2) / teamsGrades.length
  );
  
  teamsAnalyses.forEach(teamsAnalysis => {
    const difference = Math.abs(teamsAnalysis.averageGrade - teamsMean);
    
    if (teamsAnalysis.averageGrade > teamsMean + teamsGradesSTD) teamsAnalysis.type = analysisTypePositive;
    if (teamsAnalysis.averageGrade < teamsMean - teamsGradesSTD) teamsAnalysis.type = analysisTypeNegative;
    
    teamsAnalysis.results = `Performing ${difference.toFixed(1)}% ${teamsAnalysis.averageGrade >= teamsMean ? 'better' : 'worse'} than the average.`;
  });
  
  return teamsAnalyses;
};

export const analyzeStudents = (studentIds: Array<number>, assignments: Array<Assignment>): { analyses: Array<AnalysisStudentAssignmentsDetails>, average: number } => {
  const studentAnalyses: Array<AnalysisStudentAssignmentsDetails> = studentIds.map(studentId => {
    return {
      studentId,
      averageGrade: 0,
      details: []
    };
  });
  
  let studentsAverage = 0;
  let studentsAverageCount = 0;
  assignments.forEach(assignment => {
    const assignmentSubmissionsFiltered: Assignment = {
      ...assignment,
      submissions: assignment.submissions.filter(submission => studentIds.includes(submission.studentId))
    };
    const assignmentAverage = analyzeStudentsAssignment(studentAnalyses, assignmentSubmissionsFiltered);
    if (!assignment.optional) {
      studentsAverage += assignmentAverage;
      ++studentsAverageCount;
    }
  });
  studentsAverage /= studentsAverageCount;
  
  studentAnalyses.forEach(studentAnalysis => {
    studentAnalysis.averageGrade /= studentAnalysis.details.filter(detail => !detail.optional).length;
  });
  
  return {
    analyses: studentAnalyses,
    average: studentsAverage
  };
};

const analyzeStudentsAssignment = (studentAnalyses: Array<AnalysisStudentAssignmentsDetails>, assignment: Assignment): number => {
  let averageGrade = 0;
  let totalSubmissionsAnalyzed = 0;
  
  const sortedGrades = assignment.submissions.map(submission => submission.grade).sort();
  const mostCommonGrade = sortedGrades[Math.floor(sortedGrades.length / 2)];
  
  assignment.submissions.forEach(submission => {
    const studentAnalysis = studentAnalyses.find(studentAnalysis => studentAnalysis.studentId === submission.studentId);
    
    if (!studentAnalysis) return;
    
    let type: AnalysisType = analysisTypeNeutral;
    if (submission.grade < mostCommonGrade) type = analysisTypeNegative;
    if (submission.grade > mostCommonGrade) type = analysisTypePositive;
    
    let results = '';
    if (type !== 'neutral') {
      const difference = Math.abs(mostCommonGrade - submission.grade) / assignment.grade * 100;
      const mostCommon = mostCommonGrade / assignment.grade * 100;
      const grade = submission.grade / assignment.grade * 100;
      results = `Performed ${difference.toFixed(1)}% ${type === analysisTypePositive ? 'better' : 'worse'} in ${assignment.name}${assignment.optional ? ' (Optional)' : ''}. (Common: ${mostCommon.toFixed(1)}%, Theirs: ${grade.toFixed(1)}%)`;
    }
    
    if (!assignment.optional || submission.grade > 0) {
      const average = submission.grade / assignment.grade * 100;
      averageGrade += average;
      ++totalSubmissionsAnalyzed;
      studentAnalysis.averageGrade += average;
      studentAnalysis.details.push({
        optional: assignment.optional,
        assignmentId: assignment.id,
        grade: submission.grade,
        type,
        results
      });
    }
  });
  
  return averageGrade > 0 ? averageGrade / totalSubmissionsAnalyzed : 0;
};
