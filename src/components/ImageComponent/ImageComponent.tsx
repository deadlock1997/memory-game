import { Button } from "@mui/material";
import { IProps } from "./ImageComponent.types";
import { useSpring } from "@react-spring/web";
import { AnimatedBox } from "../Animated/animated";
import HelpIcon from "@mui/icons-material/Help";
import CheckIcon from "@mui/icons-material/Check";
import { forwardRef } from "react";
const ImageComponent = forwardRef(
  (props: IProps, ref: React.RefObject<HTMLButtonElement>) => {
    const { complete, active, setActive, children, index, keyDown } = props;
    const { transform, opacity } = useSpring({
      opacity: active ? 1 : 0,
      transform: `perspective(600px) rotateX(${active ? 180 : 0}deg)`,
      config: { duration: 300 },
    });
    const { opacity: tickSpring } = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 300 },
    });

    return (
      <Button
        key={index}
        ref={ref}
        data-testid={`button-${index}`}
        sx={{ position: "relative", p: 0, width: "100%", height: "100%" }}
        onKeyDown={(e) => {
          keyDown(e);
        }}
        onClick={() => {
          if (!complete) setActive();
        }}
      >
        {complete && (
          <AnimatedBox position={"absolute"} style={{ opacity: tickSpring }}>
            <CheckIcon color="success" />
          </AnimatedBox>
        )}
        {!complete && (
          <>
            <AnimatedBox
              style={{
                position: "absolute",
                opacity: opacity.to((o) => 1 - o),
                transform,
              }}
            >
              <HelpIcon />
            </AnimatedBox>
            <AnimatedBox
              style={{
                position: "absolute",
                opacity,
                transform,
                rotateX: "180deg",
              }}
            >
              {children}
            </AnimatedBox>
          </>
        )}
      </Button>
    );
  }
);

export default ImageComponent;
