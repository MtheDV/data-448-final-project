import {DefaultState, TeamSet} from '../../types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import axiosConfig from '../../api/axiosConfig';

interface TeamSetsState extends DefaultState {
  teamSets: Array<TeamSet>
}

const initialState: TeamSetsState = {
  teamSets: [],
  status: 'idle',
  error: null
};

export const fetchTeamSets = createAsyncThunk('teamSets/fetchTeamSets', async () => {
  const res = await axiosConfig.get('/api/team-sets');
  return res.data;
});

export const teamSetsSlice = createSlice({
  name: 'teamSets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTeamSets.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTeamSets.fulfilled, (state, action) => {
        state.status = 'complete';
        state.teamSets = action.payload.teamSets;
      })
      .addCase(fetchTeamSets.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ? action.error.message : '';
      });
  }
});

export const getTeamSets = (state: RootState) => state.teamSets;

export default teamSetsSlice.reducer;
