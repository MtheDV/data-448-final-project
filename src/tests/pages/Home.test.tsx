import {render} from '../utils';
import {screen} from '@testing-library/react';
import Home from '../../pages/Home';

describe('Home Page', () => {
  beforeEach(() => {
    render(<Home/>, ['/']);
  });
  
  it('should render', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.innerHTML === 'Home').toBeTruthy();
  });
});
