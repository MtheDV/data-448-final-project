import {configureStore} from '@reduxjs/toolkit';
import teamSetReducer from './slices/teamSetsSlice';

const store = configureStore({
  reducer: {
    teamSets: teamSetReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
