import {render} from '../../tests/utils';
import Spinner from './Spinner';
import {screen} from '@testing-library/react';

describe('Spinner Component', () => {
  it('should render when loading is true', () => {
    render(<Spinner isLoading={true}/>);
    expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument();
  });
  
  it('should not render when loading is false', () => {
    render(<Spinner isLoading={false}/>);
    expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
  });
});
