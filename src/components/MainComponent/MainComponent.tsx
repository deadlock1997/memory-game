import { createRef, useEffect, useMemo, useState } from "react";
import { generateIndexMatrix } from "./ManiComponent.functions";
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
  const [pairSet, setPairSet] = useState<number[]>([]);
  const { imageIndicesMatrix, scoreMatrix } = useMemo(() => {
    setElRefs(() =>
      Array(LevelMatrix[level][0] * LevelMatrix[level][1])
        .fill(null)
        .map(() => createRef())
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
        setLevel((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      checkThePair(pairSet, inputScore);
      clearTimeout(id);
    }, 2000);
  }, [pairSet]);

  const handleInput = (index: number, value: boolean) => {
    console.log("Handle input", index, value);
    let tempSet: number[] = [...pairSet];
    tempSet.push(index);
    const [firstIndex, secondIndex] = tempSet;
    const inputTemp: ScoreArray = [...inputScore];
    if (firstIndex === secondIndex) {
      inputTemp[firstIndex] = ScoreValue.NotSelected;
      tempSet = [];
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
    let colI = (rowIndex % LevelMatrix[level][1]);
    switch (event.key) {
      case "ArrowDown": {
        rowI++;
        rowI = Math.min(rowI, LevelMatrix[level][0] - 1);
        const index = rowI * LevelMatrix[level][1] + colI;
        elRefs?.[index]?.current?.focus();
        console.log("Navigate", colI, rowI, index);
        break;
      }
      case "ArrowUp": {
        rowI--;
        rowI = Math.max(rowI, 0);
        const index = rowI * LevelMatrix[level][1] + colI;
        elRefs?.[index]?.current?.focus();
        console.log("Navigate", colI, rowI, index);
        break;
      }
      case "ArrowRight": {
        colI++;
        colI = Math.min(LevelMatrix[level][1] - 1, colI);
        const index = rowI * LevelMatrix[level][1] + colI;
        elRefs?.[index]?.current?.focus();
        console.log("Navigate", colI, rowI, index);
        break;
      }
      case "ArrowLeft": {
        colI--;
        colI = Math.max(0, colI);
        const index = rowI * LevelMatrix[level][1] + colI;
        elRefs?.[index]?.current?.focus();
        console.log("Navigate", colI, rowI, index);
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
                setActive={(value) => handleInput(rowIndex, value)}
              >
                <ImageGenerator index={imageIndicesMatrix[rowIndex]} />
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
