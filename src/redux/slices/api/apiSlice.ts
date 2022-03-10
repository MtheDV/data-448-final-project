import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Team, TeamSet} from '../../../types';

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
    getTeam: builder.query<Team, Array<number>>({
      query: ([teamSetId, teamId]) => `team-sets/${teamSetId}/teams/${teamId}`
    })
  })
});

export const { useGetTeamSetsQuery, useGetTeamSetQuery, useGetTeamsQuery, useGetTeamQuery } = apiSlice;
