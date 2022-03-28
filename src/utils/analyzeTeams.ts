import {
  AnalysisStudentAssignmentsDetails, AnalysisTeamAssignmentsDetails,
  AnalysisType,
  Assignment,
  Team
} from '../types';

export const analyzeTeams = (teams: Array<Team>, assignments: Array<Assignment>): Array<AnalysisTeamAssignmentsDetails> => {
  // For each team, determine the average grades for their associated assignments
  // Compare average grades against each other between teams
  // Calculate differences and determine the results about it
  // Result examples:
  //    For {Assignment Name}, {Team Name} is performing 10% worse than other teams\
  let teamsAverage = 0;
  const teamsAnalyses: Array<AnalysisTeamAssignmentsDetails> = teams.map(team => {
    const [details, teamAverage] = analyzeStudents(team.enrollments.map(enrollment => enrollment.studentId), assignments);
    teamsAverage += teamAverage;
    
    return {
      teamId: team.id,
      averageGrade: teamAverage,
      type: 'neutral',
      results: '',
      details: details,
    };
  });
  teamsAverage /= teams.length;
  
  teamsAnalyses.forEach(teamsAnalysis => {
    const difference = Math.abs(teamsAnalysis.averageGrade - teamsAverage);
    
    if (teamsAnalysis.averageGrade > teamsAverage) teamsAnalysis.type = 'positive';
    if (teamsAnalysis.averageGrade < teamsAverage) teamsAnalysis.type = 'negative';
    if (teamsAnalysis.type === 'neutral') return;
    
    teamsAnalysis.results = `Performing ${difference.toFixed(1)}% ${teamsAnalysis.type === 'positive' ? 'better' : 'worse'} than the average.`;
  });
  
  return teamsAnalyses;
};

export const analyzeStudents = (studentIds: Array<number>, assignments: Array<Assignment>): [Array<AnalysisStudentAssignmentsDetails>, number] => {
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
  
  return [studentAnalyses, studentsAverage];
};

const analyzeStudentsAssignment = (studentAnalyses: Array<AnalysisStudentAssignmentsDetails>, assignment: Assignment): number => {
  let averageGrade = 0;
  let totalSubmissionsAnalyzed = 0;
  
  const assignmentSubmissionGradeCount: { [index: string]: number } = {};
  assignment.submissions.forEach(submission => {
    if (!assignmentSubmissionGradeCount[submission.grade.toString()])
      assignmentSubmissionGradeCount[submission.grade.toString()] = 0;
    assignmentSubmissionGradeCount[submission.grade.toString()] += 1;
  });
  let mostCommonGrade = 0;
  let mostCommonGradeCount = 0;
  Object.entries(assignmentSubmissionGradeCount).forEach(([grade, count]) => {
    if (count >= mostCommonGradeCount) {
      mostCommonGrade = Number(grade);
      mostCommonGradeCount = count;
    }
  });
  
  assignment.submissions.forEach(submission => {
    const studentAnalysis = studentAnalyses.find(studentAnalysis => studentAnalysis.studentId === submission.studentId);
    
    if (!studentAnalysis) return;
    
    let type: AnalysisType = 'neutral';
    if (submission.grade < mostCommonGrade) type = 'negative';
    if (submission.grade > mostCommonGrade) type = 'positive';
    
    let results = '';
    if (type !== 'neutral') {
      const difference = Math.abs(mostCommonGrade - submission.grade) / assignment.grade * 100;
      const mostCommon = mostCommonGrade / assignment.grade * 100;
      const grade = submission.grade / assignment.grade * 100;
      results = `Performed ${difference.toFixed(1)}% ${type === 'positive' ? 'better' : 'worse'} in ${assignment.name}${assignment.optional ? ' (Optional)' : ''}. (Common: ${mostCommon.toFixed(1)}%, Theirs: ${grade.toFixed(1)}%)`;
    }
    
    if (!assignment.optional) {
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
