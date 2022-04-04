import {Assignment, Student, Team, LineDataType, LineGraphData} from '../types';

export const filterAssignmentsForStudent = (studentId: number, assignments: Array<Assignment>): Array<Assignment> => {
  const filteredAssignments: Array<Assignment> = [];
  assignments.forEach(assignment => {
    filteredAssignments.push({
      ...assignment,
      submissions: assignment.submissions.filter(submission => submission.studentId === studentId)
    });
  });
  return filteredAssignments;
};

export const prepareTeamSetGraphData = (teams: Array<Team>, assignments: Array<Assignment>): LineGraphData => {
  const data: LineGraphData = [];
  teams.forEach(team => {
    const studentIds = team.enrollments.map(enrollment => enrollment.studentId);
    const teamData: Array<LineDataType> = [];
    
    assignments.forEach(assignment => {
      if (!assignment.optional) {
        let teamAverageGrade = 0;
        let teamSubmissions = 0;
        assignment.submissions.forEach(submission => {
          if (studentIds.includes(submission.studentId)) {
            teamAverageGrade += submission.grade / assignment.grade * 100;
            ++teamSubmissions;
          }
        });
        if (teamSubmissions > 1) {
          teamAverageGrade /= teamSubmissions;
        }
        teamData.push({
          x: assignment.name,
          y: teamAverageGrade
        });
      }
    });
    
    data.push({
      id: team.name,
      data: teamData
    });
  });
  
  return data;
};

export const prepareTeamGraphSeries = (assignments: Array<Assignment>, students: Array<Student>): LineGraphData => {
  const data: LineGraphData = [];
  students.forEach(student => {
    const studentData: Array<LineDataType> = [];
    
    assignments.forEach(assignment => {
      if (!assignment.optional) {
        let studentAverageGrade = 0;
        let studentSubmissions = 0;
        assignment.submissions.forEach(submission => {
          if (submission.studentId === student.id) {
            studentAverageGrade += submission.grade / assignment.grade * 100;
            ++studentSubmissions;
          }
        });
        if (studentSubmissions > 1) {
          studentAverageGrade /= studentSubmissions;
        }
        studentData.push({
          x: assignment.name,
          y: studentAverageGrade
        });
      }
    });
    
    data.push({
      id: student.name,
      data: studentData
    });
  });
  return data;
};

export const getAverageAssignmentGrade = (assignment: Assignment): number => {
  if (assignment.grade === 0) return 0;
  let average = 0;
  let totalSubmissions = 0;
  assignment.submissions.forEach(submission => {
    if (!assignment.optional) {
      totalSubmissions += 1;
      average += submission.grade / assignment.grade * 100;
    }
  });
  average /= totalSubmissions;
  return average;
};

export const getAverageAssignmentsGrade = (assignments: Array<Assignment>): number => {
  let average = 0;
  let totalAssignments = 0;
  assignments.forEach(assignment => {
    const assignmentAverage = getAverageAssignmentGrade(assignment);
    if (!assignment.optional)
      ++totalAssignments;
    average += assignmentAverage;
  });
  average /= totalAssignments;
  return average;
};

export const toTitleCase = (value: string): string => {
  return value[0].toUpperCase() + value.slice(1).toLowerCase();
};
