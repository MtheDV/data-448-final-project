import {render} from '../utils';
import {Teams} from '../../pages';

test('renders', () => {
  render(<Teams/>, ['/team-sets/1/teams']);
});
