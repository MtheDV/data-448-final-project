export type TeamSet = {
  id: number,
  name: string
}

export type Team = {
  id: number,
  teamSet: TeamSet,
  name: string
}
