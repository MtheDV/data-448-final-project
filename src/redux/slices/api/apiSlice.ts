import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Assignment, Student, Team, TeamSet} from '../../../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: '/api/'}),
  endpoints: builder => ({
    getTeamSets: builder.query<Array<TeamSet>, void>({
      query: () => 'team-sets'
    }),
    getTeamSet: builder.query<TeamSet, number>({
      query: (teamSetId) => `team-sets/${teamSetId}`
    }),
    getTeams: builder.query<Array<Team>, number>({
      query: (teamSetId) => `team-sets/${teamSetId}/teams`
    }),
    getTeam: builder.query<Team, { teamSetId: number, teamId: number }>({
      query: ({teamSetId, teamId}) => `team-sets/${teamSetId}/teams/${teamId}`
    }),
    getTeamStudents: builder.query<Array<Student>, { teamSetId: number, teamId: number }>({
      query: ({teamSetId, teamId}) => `team-sets/${teamSetId}/teams/${teamId}/students`
    }),
    getAssignments: builder.query<Array<Assignment>, boolean>({
      query: (submissions) => `assignments?submissions=${submissions}`
    })
  })
});

export const {
  useGetTeamSetsQuery,
  useGetTeamSetQuery,
  useGetTeamsQuery,
  useGetTeamQuery,
  useGetTeamStudentsQuery,
  useGetAssignmentsQuery
} = apiSlice;
