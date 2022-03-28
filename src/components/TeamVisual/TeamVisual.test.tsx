import {render} from '../../tests/utils';
import TeamVisual from './TeamVisual';

describe('Team Visual Component', () => {
  beforeEach(() => {
    render(<TeamVisual graphData={[]}/>);
  });
  
  it('should render', () => {
    expect(render(<TeamVisual graphData={[]}/>)).toBeTruthy();
  });
});
