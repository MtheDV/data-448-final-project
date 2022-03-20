import teamEnrollmentsJSON from './teamEnrollments.json';
import assignmentsJSON from './assignments.json';
import teamSetsJSON from './teamSets.json';
import teamsJSON from './teams.json';
import coursesJSON from './courses.json';
import submissionsJSON from './submissions.json';
import {Assignment, Course, Submission, Team, TeamEnrollment, TeamSet} from '../../types';

export const mockTeamEnrollments: Array<TeamEnrollment> = teamEnrollmentsJSON;
export const mockAssignments: Array<Assignment> = assignmentsJSON;
export const mockTeamSets: Array<TeamSet> = teamSetsJSON;
export const mockTeams: Array<Team> = teamsJSON;
export const mockCourses: Array<Course> = coursesJSON;
export const mockSubmissions: Array<Submission> = submissionsJSON;
