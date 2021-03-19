import React from "react";
import type { Keyframes } from "styled-components";
import styled, { CSSKeyframes, keyframes } from "styled-components";
import { cubicBezier, translate3d } from "./lib/react-animations/utils";

const animationRightSlash: CSSKeyframes = {
  "0%": {
    opacity: 0,
    transform: translate3d("-6em", 0, 0),
  },
  "25%": {
    opacity: 0,
    transform: translate3d("-6em", 0, 0),
  },
  "50%": {
    opacity: 1,
  },
  "75%": {
    transform: translate3d(0, 0, 0),
  },
  "100%": {
    transform: translate3d(0, 0, 0),
  },
};

const animationRightSlashKeyframes = keyframes(animationRightSlash);

const Graph01 = styled.div<{
  keyframes: Keyframes;
  duration: string;
  direction: "normal" | "reverse";
  hidden?: boolean;
}>`
  animation: ${(props) => props.keyframes};
  animation-timing-function: ${cubicBezier(0.19, 0.76, 0.32, 1)};
  animation-duration: ${(props) => props.duration};
  animation-iteration-count: 1;
  animation-direction: ${(props) => props.direction};
  animation-fill-mode: both;
  ${(props) => (props.hidden ? "display : none;" : "")}
  order: 1;
  min-width: 0.3em;
  height: 3.5em;
  background: #47d;
  box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.5);
  border: 2px solid red;
  position: absolute;
  top: 10;
`;

const GrRoot = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  transition: "left 0.1s, bottom 0.1s, right 0.1s",

  fontSize: "28px",
  bottom: "6rem",
  right: "4rem",
  flexDirection: "row-reverse",
});

const G0: React.FC<{ reverse?: boolean; hidden?: boolean }> = ({
  reverse,
  hidden,
}) => (
  <Graph01
    keyframes={animationRightSlashKeyframes}
    duration="4s"
    direction={reverse ? "reverse" : "normal"}
    hidden={hidden}
  />
);

const Card: React.FC = () => {
  const gr: Record<string, ReturnType<typeof G0>> = {
    "hide-anim": <G0 hidden />,
    "animation-in": <G0 />,
    "animation-out": <G0 reverse />,
  };

  const curAnimClass = "animation-in";
  return <GrRoot key={curAnimClass}>{gr[curAnimClass]}</GrRoot>;
};

export default Card;
