import { createRef, useEffect, useMemo, useState } from "react";
import {
  generate2dEmptyMatrix,
  generateIndexMatrix,
  shuffle,
} from "./ManiComponent.functions";
import { LevelMatrix, ScoreArray, ScoreValue } from "./MainComponent.types";
import { Box, Button, Typography, useTheme } from "@mui/material";
import ImageComponent from "../ImageComponent/ImageComponent";
import { ImageGenerator } from "../Icons/Icons";

const MainComponent = () => {
  const theme = useTheme();
  const [level, setLevel] = useState(0);
  const [elRefs, setElRefs] = useState<React.RefObject<HTMLButtonElement>[]>(
    []
  );
  const [triggerSuffle, setTriggerSuffle] = useState(0);
  const [inputScore, setInputScore] = useState<ScoreArray>([]);
  const [randomImageIndies, setRandomImageIndices] = useState<number[]>([]);
  const [pairSet, setPairSet] = useState<number[]>([]);
  const { imageIndicesMatrix, scoreMatrix } = useMemo(() => {
    setElRefs(() =>
      generate2dEmptyMatrix(
        LevelMatrix[level][0] * LevelMatrix[level][1],
        null
      ).map(() => createRef())
    );
    setRandomImageIndices(
      shuffle(generate2dEmptyMatrix(15, 0).map((_, i) => i)).slice(
        0,
        (LevelMatrix[level][0] * LevelMatrix[level][1]) / 2
      )
    );
    return generateIndexMatrix(LevelMatrix[level]);
  }, [level]);

  useEffect(() => {
    setInputScore(scoreMatrix);
    setPairSet([]);
  }, [scoreMatrix]);

  const checkThePair = (pairSet: number[], inputScore: ScoreArray) => {
    if (pairSet.length === 2) {
      const [firstIndex, secondIndex] = pairSet;
      const inputTemp: ScoreArray = [...inputScore];
      if (imageIndicesMatrix[firstIndex] === imageIndicesMatrix[secondIndex]) {
        inputTemp[firstIndex] = ScoreValue.Done;
        inputTemp[secondIndex] = ScoreValue.Done;
      }
      if (imageIndicesMatrix[firstIndex] !== imageIndicesMatrix[secondIndex]) {
        inputTemp[firstIndex] = ScoreValue.NotSelected;
        inputTemp[secondIndex] = ScoreValue.NotSelected;
      }
      setInputScore(inputTemp);
      setPairSet([]);
      if (inputTemp.every((value) => value === ScoreValue.Done)) {
        setPairSet([]);
        const timeOutId = setTimeout(() => {
          setLevel((prev) => prev + 1);
          clearTimeout(timeOutId);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      checkThePair(pairSet, inputScore);
      clearTimeout(id);
    }, 2000);
  }, [pairSet]);

  const handleInput = (index: number) => {
    let tempSet: number[] = [...pairSet];
    tempSet.push(index);
    let [firstIndex, secondIndex] = tempSet;
    const inputTemp: ScoreArray = [...inputScore];
    if (firstIndex === secondIndex) {
      inputTemp[firstIndex] = ScoreValue.NotSelected;
      tempSet = [];
      firstIndex = undefined;
      secondIndex = undefined;
    }
    if (firstIndex !== undefined && secondIndex === undefined) {
      inputTemp[firstIndex] = ScoreValue.Selected;
    }
    if (firstIndex !== undefined && secondIndex !== undefined) {
      inputTemp[secondIndex] = ScoreValue.Selected;
    }
    setInputScore(inputTemp);
    setPairSet(tempSet);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    rowIndex: number
  ) => {
    let rowI = Math.floor(rowIndex / LevelMatrix[level][1]);
    let colI = rowIndex % LevelMatrix[level][1];
    switch (event.key) {
      case "ArrowDown": {
        rowI++;
        rowI = Math.min(rowI, LevelMatrix[level][0] - 1);
        const index = rowI * LevelMatrix[level][1] + colI;
        elRefs?.[index]?.current?.focus();
        break;
      }
      case "ArrowUp": {
        rowI--;
        rowI = Math.max(rowI, 0);
        const index = rowI * LevelMatrix[level][1] + colI;
        elRefs?.[index]?.current?.focus();
        break;
      }
      case "ArrowRight": {
        colI++;
        colI = Math.min(LevelMatrix[level][1] - 1, colI);
        const index = rowI * LevelMatrix[level][1] + colI;
        elRefs?.[index]?.current?.focus();
        break;
      }
      case "ArrowLeft": {
        colI--;
        colI = Math.max(0, colI);
        const index = rowI * LevelMatrix[level][1] + colI;
        elRefs?.[index]?.current?.focus();
        break;
      }
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "fit-content",
        margin: "auto",
        height: "100%",
        gap: 2,
      }}
    >
      <Typography variant="h5">Memory game</Typography>
      <Typography variant="body1">Level {level + 1}</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: `repeat(${LevelMatrix[level][0]}, 64px)`,
          gridTemplateColumns: `repeat(${LevelMatrix[level][1]}, 64px)`,
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            gridTemplateRows: `repeat(${LevelMatrix[level][0]}, 64px)`,
            gridTemplateColumns: `repeat(${LevelMatrix[level][1]}, 1fr)`,
          },
        }}
        boxSizing={"border-box"}
      >
        {imageIndicesMatrix.map((_, rowIndex) => {
          return (
            <Box border={"1px solid"} key={rowIndex}>
              <ImageComponent
                index={rowIndex}
                ref={elRefs[rowIndex]}
                keyDown={(event) => {
                  handleKeyDown(event, rowIndex);
                }}
                complete={inputScore[rowIndex] === ScoreValue.Done}
                active={inputScore[rowIndex] === ScoreValue.Selected}
                setActive={() => {
                  handleInput(rowIndex);
                }}
              >
                <ImageGenerator
                  index={randomImageIndies[imageIndicesMatrix[rowIndex]]}
                />
              </ImageComponent>
            </Box>
          );
        })}
      </Box>
      <Button
        fullWidth
        variant="contained"
        disabled={level === 5}
        onClick={() => {
          setLevel(level + 1);
        }}
      >
        Level Up
      </Button>
      <Button
        fullWidth
        variant="contained"
        disabled={level === 0}
        onClick={() => {
          setLevel(level - 1);
        }}
      >
        Level Down
      </Button>
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          setInputScore(scoreMatrix);
          setPairSet([]);
        }}
      >
        Reset
      </Button>
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          setInputScore(scoreMatrix);
          setPairSet([]);
          setTriggerSuffle(triggerSuffle + 1);
        }}
      >
        Shuffle
      </Button>
    </Box>
  );
};

export default MainComponent;
