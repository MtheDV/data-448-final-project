import {DefaultState, TeamSet} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface TeamSetsState extends DefaultState {
  teamSets: Array<TeamSet>
}

const initialState: TeamSetsState = {
  teamSets: [],
  status: 'idle',
  error: null
};

export const teamSetsSlice = createSlice({
  name: 'teamSets',
  initialState,
  reducers: {}
});

export const getTeamSets = (state: RootState) => state.teamSets;

export default teamSetsSlice.reducer;
