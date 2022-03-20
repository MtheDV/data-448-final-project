import {render} from '../utils';
import {screen} from '@testing-library/react';
import Home from '../../pages/Home';

describe('Home Page', () => {
  beforeEach(() => {
    render(<Home/>, ['/']);
  });
  
  it('should render', () => {
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
