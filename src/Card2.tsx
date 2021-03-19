import type { Property } from "csstype";
import React, { useEffect, useState } from "react";
import styled, { keyframes, Keyframes } from "styled-components";
import { translate3d } from "./lib/react-animations/utils";
import { Animation } from "./lib/react-animations/types";

const animationRightSlash: Animation = {
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

const animationRightSlashKeyframes = keyframes`${animationRightSlash}`;

const style1: { graph1: React.CSSProperties } = {
  graph1: {
    order: 1,
    minWidth: "0.3em",
    height: "3.5em",
    background: "#47D",
    boxShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",
    border: "2px solid red",
    position: "absolute",
    top: 10,
    //animationDirection: "reverse",
    //animationIterationCount: 1,
    //animationFillMode: "both",
  },
};

const Graph1 = styled.span`
  animation: ${animationRightSlashKeyframes};
  animation-timing-function: cubic-bezier(0.19, 0.76, 0.32, 1);
  animation-duration: 4s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
  order: 1;
  min-width: 0.3em;
  height: 3.5em;
  background: #47d;
  box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.5);
  border: 2px solid red;
  position: absolute;
  top: 10;
`;

type TextStyle = {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: Property.FontWeight;
  color?: string;
  height?: string;
  marginBottom?: string;
  textTransform?: Property.TextTransform;
};

type AnimationKind = {
  animType: "style-1";
  animDurationMs: number;
  activeDurationMs: number;
};

type CardProps = {
  primaryText: string;
  secondaryText: string;

  align?: "right" | "left" | "center";

  anim: AnimationKind;

  titleStyle?: TextStyle;
  textStyle?: TextStyle;

  logoMaxHeigh?: string;
};

type animStep = "pre-load" | "ease-in" | "active" | "ease-out" | "unloaded";
type animClass = "" | "hide-anim" | "animation-in" | "animation-out";

const Card: React.FC<CardProps> = (props) => {
  const animationStyle: React.CSSProperties = {
    animationDuration: `${props.anim.animDurationMs}ms`,
  };

  const [[curAnimClass, curAnimStep], setState] = useState<
    [animClass, animStep]
  >(["hide-anim", "pre-load"]);

  const nextAnimStep = (
    curStep: animStep,
  ): { nextStep: animStep; className: animClass; delay: number } => {
    switch (curStep) {
      case "pre-load":
        return { nextStep: "ease-in", className: "animation-in", delay: 0 };
      case "ease-in":
        return {
          nextStep: "active",
          className: "",
          delay: props.anim.animDurationMs,
        };
      case "active":
        return {
          nextStep: "ease-out",
          className: "animation-out",
          delay: props.anim.activeDurationMs,
        };
      case "ease-out":
        return {
          nextStep: "unloaded",
          className: "hide-anim",
          delay: props.anim.animDurationMs,
        };
      case "unloaded":
        return { nextStep: "pre-load", className: "", delay: 1000 };
      default:
        throw new Error("unreachable");
    }
  };

  useEffect(() => {
    const { nextStep, className, delay } = nextAnimStep(curAnimStep);

    console.log(
      `[effect] CurStep: ${curAnimStep}, nextStep: ${nextStep}, nextClass: ${className}, delay: ${delay}.`,
    );

    if (delay < 0) {
      return;
    }
    setTimeout(() => {
      setState([className || curAnimClass, nextStep]);
    }, delay);
  }, [curAnimStep]);

  const hc = curAnimClass == "hide-anim" ? { display: "none" } : null;
  return (
    <div
      key={curAnimClass}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        transition: "left 0.1s, bottom 0.1s, right 0.1s",

        fontSize: "28px",
        bottom: "6rem",
        right: "4rem",
        flexDirection: "row-reverse",
      }}
    >
      <Graph1
        style={{
          ...hc,
          animationDirection:
            curAnimClass == "animation-in" ? "normal" : "reverse",
        }}
      />
    </div>
  );
};

export default Card;
