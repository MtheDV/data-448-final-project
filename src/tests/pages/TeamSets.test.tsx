import {render} from '../utils';
import {screen, waitForElementToBeRemoved} from '@testing-library/react';
import {mockTeamSets} from '../../mocks/teams';
import {server} from '../../mocks/api/server';
import {getTeamSetsError} from '../../mocks/api/handlers';
import TeamSets from '../../pages/TeamSets';

describe('Team Sets Page', () => {
  beforeEach(async () => {
    render(<TeamSets />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading\.\.\./i));
  });
  
  it('should show team sets on render', async () => {
    mockTeamSets.forEach(teamSet => {
      expect(screen.getByText(teamSet.name)).toBeInTheDocument();
    });
  });
});

describe('Team Sets Page Error', () => {
  beforeEach(async () => {
    server.use(getTeamSetsError);
    render(<TeamSets />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading\.\.\./i));
  });
  
  it('should render error', () => {
    expect(screen.getByText(/Error!/i)).toBeInTheDocument();
  });
});
