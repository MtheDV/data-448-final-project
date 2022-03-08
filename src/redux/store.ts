import {configureStore} from '@reduxjs/toolkit';
import teamSetReducer from './slices/teamSetsSlice';

export const storeOptions = {
  reducer: {
    teamSets: teamSetReducer
  }
};

const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
