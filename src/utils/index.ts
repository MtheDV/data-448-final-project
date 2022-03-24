import {Assignment, Data, Series, Student} from '../types';

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

export const prepareTeamGraphSeries = (assignments: Array<Assignment>, students: Array<Student>): Series => {
  const data: Data = [];
  assignments.forEach(assignment => {
    data.push({
      x: assignment.name,
      y: getAverageAssignmentGrade(assignment),
      studentGrades: assignment.submissions.map(submission => {
        const student = students.find(student => student.id === submission.studentId);
        return {
          student,
          grade: getAverageAssignmentGrade({...assignment, submissions: [submission]})
        };
      })
    });
  });
  return [{
    dataKey: 'Overall Assignment Data',
    data
  }];
};

export const prepareStudentTeamGraphSeries = (assignments: Array<Assignment>): Series => {
  const data: Data = [];
  assignments.forEach(assignment => {
    data.push({
      x: assignment.name,
      y: getAverageAssignmentGrade(assignment)
    });
  });
  return [{
    dataKey: 'Assignment Data',
    data
  }];
};

export const getAverageAssignmentGrade = (assignment: Assignment): number => {
  if (assignment.grade === 0) return 0;
  let average = 0;
  let totalSubmissions = 0;
  assignment.submissions.forEach(submission => {
    totalSubmissions += 1;
    average += submission.grade / assignment.grade * 100;
  });
  average /= totalSubmissions;
  return average;
};

export const getAverageAssignmentsGrade = (assignments: Array<Assignment>): number => {
  let average = 0;
  let totalAssignments = 0;
  assignments.forEach(assignment => {
    const assignmentAverage = getAverageAssignmentGrade(assignment);
    ++totalAssignments;
    average += assignmentAverage;
  });
  average /= totalAssignments;
  return average;
};
