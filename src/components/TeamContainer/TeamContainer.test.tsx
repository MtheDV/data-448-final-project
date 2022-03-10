import {render} from '../../tests/utils';
import TeamContainer from './TeamContainer';
import {mockTeam1} from '../../mocks/teams';

test('renders', () => {
  render(<TeamContainer team={mockTeam1}/>);
});
