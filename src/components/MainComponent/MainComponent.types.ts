export type ScoreArray = ScoreValue[];

export enum ScoreValue {
  Done = -3,
  Selected = -2,
  NotSelected = -1,
}

export const LevelMatrix = [
    [2, 2],
    [2, 3],
    [3, 4],
    [4, 4],
    [4, 5],
    [5, 6],
]