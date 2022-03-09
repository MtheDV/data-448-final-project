import {Team, TeamSet} from '../types';

export const mockTeamSet1: TeamSet = {
  id: 1,
  name: 'Team Set 1'
};

export const mockTeamSet2: TeamSet = {
  id: 2,
  name: 'Team Set 2'
};

export const mockTeamSets: Array<TeamSet> = [mockTeamSet1, mockTeamSet2];

export const mockTeam1: Team = {
  id: 1,
  name: 'Test Team 1',
  teamSet: mockTeamSet1
};

export const mockTeam2: Team = {
  id: 2,
  name: 'Test Team 2',
  teamSet: mockTeamSet1
};
