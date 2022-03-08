import {FC, ReactElement} from 'react';
import {render} from '@testing-library/react';
import {RenderOptions} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import teamSetReducer from '../redux/slices/teamSetsSlice';

const AllTheProviders: FC = ({children}) => {
  return (
    <Provider
      store={
        configureStore({
          reducer: {
            teamSets: teamSetReducer
          }
        })
      }
    >
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react';
export {customRender as render};
