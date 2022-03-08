import {render} from '../utils';
import {App} from '../../pages';

test('renders', () => {
  render(<App/>, ['/']);
});
