import {render} from '../utils';
import Home from '../../pages/Home';
import {screen} from '@testing-library/react';

describe('Home Page', () => {
  beforeEach(() => {
    render(<Home />);
  });
  
  it('should render', () => {
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
