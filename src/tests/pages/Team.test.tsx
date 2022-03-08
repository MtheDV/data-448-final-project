import {render} from '../utils';
import {Team} from '../../pages';

test('renders', () => {
  render(<Team/>, ['/team-sets/1/teams/1']);
});
