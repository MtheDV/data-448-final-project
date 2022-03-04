import {DefaultState, TeamSet} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../store';
import axios, {AxiosError, AxiosResponse} from 'axios';

interface TeamSetsState extends DefaultState {
  teamSets: Array<TeamSet>,
  loading: boolean,
  error: string
}

const initialState: TeamSetsState = {
  teamSets: [],
  loading: false,
  error: ''
};

export const teamSetsSlice = createSlice({
  name: 'teamSets',
  initialState,
  reducers: {
    fetchBegin: state => {
      return {
        ...state,
        loading: true,
        error: ''
      };
    },
    fetchSuccess: (state, action: PayloadAction<Array<TeamSet>>) => {
      return {
        ...state,
        teamSets: action.payload,
        loading: false,
        error: ''
      };
    },
    fetchError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
  }
});
export const {fetchBegin, fetchSuccess, fetchError} = teamSetsSlice.actions;

// Selectors
export const selectTeamSets = (state: RootState) => state.teamSets;

// Get team sets through API via a thunk
export const getTeamSets = () => (dispatch: AppDispatch) => {
  dispatch(fetchBegin());
  axios.get('/api/team-sets').then((res: AxiosResponse<{teamsSets: Array<TeamSet>}>) => {
    dispatch(fetchSuccess(res.data.teamsSets));
  }).catch((err: AxiosError) => {
    dispatch(fetchError(err.message));
  });
};

export default teamSetsSlice.reducer;
