import type { Property } from "csstype";
import React, { useEffect, useState } from "react";
import "./Card.css";

type TextStyle = {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: Property.FontWeight;
  color?: string;
  height?: string;
  marginBottom?: string;
  textTransform?: Property.TextTransform;
};

type Animation = {
  animType: "style-1";
  animDurationMs: number;
  activeDurationMs: number;
};

type CardProps = {
  primaryText: string;
  secondaryText: string;

  align?: "right" | "left" | "center";

  anim: Animation;

  titleStyle?: TextStyle;
  textStyle?: TextStyle;

  logoMaxHeigh?: string;
};

const style1: { graph1: React.CSSProperties; graph2: React.CSSProperties } = {
  graph1: {
    order: 1,
    minWidth: "0.3em",
    height: "3.5em",
    background: "#47D7AC",
    boxShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",

    position: "absolute",
    bottom: 10,
  },
  graph2: {
    background: "rgba(55,85,112,0.46)",
    opacity: "",
    border: "solid 0rem",
    borderColor: "none",
    borderRadius: "calc(1.24rem * 1.1)",
    boxShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",

    order: 3,
    zIndex: -1,
    position: "absolute",
    width: "100%",
    height: "calc(100% + 2em)",
    margin: "0 -1em",
    padding: "0 1em",
    boxSizing: "border-box",

    right: 0,
    marginLeft: "-1.8em",
    paddingLeft: "1.8em",
  },
};

type animStep = "pre-load" | "ease-in" | "active" | "ease-out" | "unloaded";
type animClass = "" | "hide-anim" | "animation-in" | "animation-out";

const Card: React.FC<CardProps> = (props) => {
  const animationStyle: React.CSSProperties = {
    animationDuration: `${props.anim.animDurationMs}ms`,
  };
  const fontStyle: React.CSSProperties = {
    fontSize: "28px",
    bottom: "6rem",
  };
  if (props.align === "right" || props.align === "left") {
    fontStyle[props.align] = "4rem";
    fontStyle["flexDirection"] = props.align === "left" ? "row" : "row-reverse";
  }
  const defaultTextStyle: TextStyle = {
    fontFamily: "Open Sans, sans-serif",
    fontSize: "14px",
    fontWeight: "normal",
    color: "#F2F2F2",
    textTransform: "none",
  };
  const defaultTitleStyle: React.CSSProperties = {
    transition: "margin 0.1s",
    marginBottom: "0em",
  };
  const titleStyle: React.CSSProperties = {
    ...defaultTextStyle,
    ...defaultTitleStyle,
    ...props.titleStyle,
  };
  if (!titleStyle.height) {
    titleStyle.height = `calc(${titleStyle.fontSize}) + 0.25em`;
  }
  const textStyle: React.CSSProperties = {
    ...defaultTextStyle,
    ...props.textStyle,
  };
  if (!textStyle.height) {
    textStyle.height = `calc(${textStyle.fontSize}) + 0.25em`;
  }

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

    if (delay < 0) {
      return;
    }
    setTimeout(() => {
      setState([className || curAnimClass, nextStep]);
    }, delay);
  }, []); // [curAnimStep]

  return (
    <div className="Card">
      <div
        key={curAnimClass}
        className={`alt ${props.align} ${props.anim.animType} ${curAnimClass}`}
        style={{ ...fontStyle }}
      >
        <div className="logo no-logo" style={{ ...animationStyle }}>
          <img src="//:0" style={{ maxHeight: props.logoMaxHeigh }} />
        </div>

        <div style={{ ...animationStyle, ...style1.graph1 }}></div>

        <div className="text-content">
          <div className="text-mask" style={titleStyle}>
            <div style={{ ...animationStyle }}>{props.primaryText}</div>
          </div>
          <div className="text-mask" style={textStyle}>
            <div style={{ ...animationStyle }}>{props.secondaryText}</div>
          </div>
        </div>

        <div style={{ ...animationStyle, ...style1.graph2 }}></div>
      </div>
    </div>
  );
};

export default Card;
