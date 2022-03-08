import {ReactElement, ReactNode} from 'react';
import {render} from '@testing-library/react';
import {RenderOptions} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {MemoryRouter} from 'react-router-dom';
import {storeOptions} from '../redux/store';

const GlobalProvidersWrapper = ({children, initialRoutes}: { children?: ReactNode, initialRoutes: Array<string> }) => {
  return (
    <Provider
      store={
        configureStore(storeOptions)
      }
    >
      <MemoryRouter initialEntries={initialRoutes}>
        {children}
      </MemoryRouter>
    </Provider>
  );
};

const customRender = (ui: ReactElement, initialRoutes: Array<string> = ['/'], options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {
    wrapper: (args) => GlobalProvidersWrapper({
      ...args,
      initialRoutes
    }), ...options
  });

export * from '@testing-library/react';
export {customRender as render};
