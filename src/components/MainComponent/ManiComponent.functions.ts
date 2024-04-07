import { ScoreArray } from "./MainComponent.types";

export const generateIndexMatrix = ([row, column]: number[]): {
  imageIndicesMatrix: number[];
  scoreMatrix: ScoreArray;
} => {
  const lengthOfArray = row * column;
  const matrix = [];
  for (let i = 0; i < lengthOfArray / 2; i++) {
    matrix.push(i);
    matrix.push(i);
  }
  const suffledCards: number[] = shuffle(matrix);
  const scoreMatrix = generate2dEmptyMatrix(row * column, -1);
  return { imageIndicesMatrix: suffledCards, scoreMatrix };
};

export const shuffle = (array: number[]) => {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export const generate2dEmptyMatrix = (num: number, values: number | null): ScoreArray => {
  return Array(num).fill(values);
};
