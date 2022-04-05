import {render} from '../../tests/utils';
import TeamContainer from './TeamContainer';
import {mockTeams} from '../../api/mocks';

test('renders', () => {
  render(<TeamContainer team={mockTeams[0]} setSelectedTeamFromAnalysis={() => 0} selected={false}/>);
});
