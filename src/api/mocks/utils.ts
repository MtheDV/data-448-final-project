import {Assignment, Course, Team, TeamEnrollment, TeamSet} from '../../types';
import {mockAssignments, mockCourses, mockTeamEnrollments, mockTeams, mockTeamSets} from './index';

export const getCourses = (): Array<Course> => {
  return mockCourses;
};

export const getCourse = (courseId: number): Course | undefined => {
  return getCourses().find(course => course.id === courseId);
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

export const getEnrollments = (teamSetId: number, teamId: number): Array<TeamEnrollment> => {
  return mockTeamEnrollments.filter(enrollment => enrollment.teamId === Number(teamId) && enrollment.teamSetId === Number(teamSetId));
};

export const getAssignments = (includeSubmissions?: boolean) => {
  if (includeSubmissions) return mockAssignments;
  return mockAssignments.map(assignment => {
    return {
      ...assignment,
      submissions: []
    };
  });
};

export const getTeamAssignments = (teamSetId: number, teamId: number, includeSubmissions?: boolean): Array<Assignment> => {
  const assignments: Array<Assignment> = [];
  const enrollments = getEnrollments(teamSetId, teamId);
  getAssignments(includeSubmissions).forEach(assignment => {
    assignments.push({
      ...assignment,
      submissions: assignment.submissions.filter(submission => enrollments.find(enrollment => enrollment.student.id === submission.studentId))
    });
  });
  return assignments;
};
