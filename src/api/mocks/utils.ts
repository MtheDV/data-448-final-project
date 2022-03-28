import {Assignment, Course, Student, Team, TeamSet} from '../../types';
import {mockAssignments, mockCourses, mockStudents, mockTeams, mockTeamSets} from './index';

export const getCourses = (): Array<Course> => {
  return mockCourses;
};

export const getCourse = (courseId: number): Course | undefined => {
  return getCourses().find(course => course.id === courseId);
};

export const getStudents = (): Array<Student> => {
  return mockStudents;
};

export const getStudent = (studentId: number): Student | undefined => {
  return getStudents().find(student => student.id === studentId);
};

export const getTeamSets = (): Array<TeamSet> => {
  return mockTeamSets;
};

export const getTeamSet = (teamSetId: number): TeamSet | undefined => {
  return getTeamSets().find(teamSet => teamSet.id === teamSetId);
};

export const getTeams = (teamSetId: number): Array<Team> => {
  return mockTeams.filter(team => team.teamSetId === teamSetId);
};

export const getTeam = (teamSetId: number, teamId: number): Team | undefined => {
  return getTeams(teamSetId).find(team => team.id === teamId);
};

export const getTeamStudents = (teamSetId: number, teamId: number): Array<Student> => {
  const teamEnrollments = getTeam(teamSetId, teamId)?.enrollments;
  return getStudents().filter(student => teamEnrollments?.find(enrollment => enrollment.studentId === student.id));
};

export const getAssignments = (includeSubmissions?: boolean): Array<Assignment> => {
  if (includeSubmissions) return mockAssignments;
  return mockAssignments.map(assignment => {
    return {
      ...assignment,
      submissions: []
    };
  });
};
