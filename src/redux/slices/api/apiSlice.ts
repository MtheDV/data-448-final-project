import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TeamSet} from '../../../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: '/api/'}),
  endpoints: builder => ({
    getTeamSets: builder.query<Array<TeamSet>, void>({
      query: () => 'team-sets'
    }),
    getTeamSet: builder.query<TeamSet, number>({
      query: (id) => 'team-sets/' + id
    })
  })
});

export const { useGetTeamSetsQuery, useGetTeamSetQuery } = apiSlice;
