import {configureStore} from '@reduxjs/toolkit';
import teamSetsReducer from './slices/teamSetsSlice';
import {apiSlice} from './slices/api/apiSlice';
import {CurriedGetDefaultMiddleware} from '@reduxjs/toolkit/dist/getDefaultMiddleware';

export const storeOptions = {
  reducer: {
    teamSets: teamSetsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
};

const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
