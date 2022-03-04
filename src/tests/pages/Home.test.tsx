import {render} from '../utils';
import Home from '../../pages/Home';
import {screen, waitForElementToBeRemoved} from '@testing-library/react';
import {mockTeamSets} from '../../mocks/teams';
import {server} from '../../mocks/api/server';
import {getTeamSetsError} from '../../mocks/api/handlers';

describe('Home Page', () => {
  beforeEach(async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  });
  
  it('should show team sets on render', async () => {
    mockTeamSets.forEach(teamSet => {
      expect(screen.getByText(teamSet.name)).toBeInTheDocument();
    });
  });
});

describe('Home Page Error', () => {
  beforeEach(async () => {
    server.use(getTeamSetsError);
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  });
  
  it('should render error', () => {
    expect(screen.getByText(/Error!/)).toBeInTheDocument();
  });
});
