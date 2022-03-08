import {render} from '../utils';
import {TeamSet} from '../../pages';

test('renders', () => {
  render(<TeamSet/>, ['/team-sets/1']);
});
