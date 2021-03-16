import React, { ReactElement, useEffect, useState } from "react";
import "./SimpleSlide.css";
import type { Property } from "csstype";

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
  animDurationMs: 4000;
  activeDurationMs: 5000;
};

type SimpleSlideProps = {
  title: string;
  text: string;

  align?: "right" | "left" | "center";

  anim: Animation;

  titleStyle?: TextStyle;
  textStyle?: TextStyle;

  logoMaxHeigh?: string;
};

const style1: { graph1: React.CSSProperties; graph2: React.CSSProperties } = {
  graph1: {
    background: "#47D7AC",
    boxShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",
  },
  graph2: {
    background: "rgba(55,85,112,0.46)",
    opacity: "",
    border: "solid 0rem",
    borderColor: "none",
    borderRadius: "calc(1.24rem * 1.1)",
    boxShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",
  },
};

type animStep = "pre-load" | "ease-in" | "active" | "ease-out" | "unloaded";
type animClass = "" | "hide-anim" | "animation-in" | "animation-out";

const SimpleSlide: React.FC<SimpleSlideProps> = (props): ReactElement => {
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
  const titleStyle: React.CSSProperties = { ...defaultTextStyle, ...defaultTitleStyle, ...props.titleStyle };
  if (!titleStyle.height) {
    titleStyle.height = `calc(${titleStyle.fontSize}) + 0.25em`;
  }
  const textStyle: React.CSSProperties = { ...defaultTextStyle, ...props.textStyle };
  if (!textStyle.height) {
    textStyle.height = `calc(${textStyle.fontSize}) + 0.25em`;
  }

  const [[curAnimClass, curAnimStep], setState] = useState<[animClass, animStep]>(["hide-anim", "pre-load"]);

  const nextAnimStep = (curStep: animStep): { nextStep: animStep; className: animClass; delay: number } => {
    switch (curStep) {
      case "pre-load":
        return { nextStep: "ease-in", className: "animation-in", delay: 0 };
      case "ease-in":
        return { nextStep: "active", className: "", delay: props.anim.animDurationMs };
      case "active":
        return { nextStep: "ease-out", className: "animation-out", delay: props.anim.activeDurationMs };
      case "ease-out":
        return { nextStep: "unloaded", className: "hide-anim", delay: props.anim.animDurationMs };
      case "unloaded":
        return { nextStep: "pre-load", className: "", delay: 1000 };
      default:
        throw new Error("unreachable");
    }
  };

  useEffect(() => {
    const { nextStep, className, delay } = nextAnimStep(curAnimStep);

    console.log(`[effect] CurStep: ${curAnimStep}, nextStep: ${nextStep}, nextClass: ${className}, delay: ${delay}.`);

    if (delay < 0) {
      return;
    }
    setTimeout(() => {
      setState([className || curAnimClass, nextStep]);
    }, delay);
  }, [curAnimStep]);

  console.log(`[render] Step: ${curAnimStep}, Class: ${curAnimClass}.`);

  return (
    <div className="SimpleSlide">
      <div key={curAnimClass} className={`alt ${props.align} ${props.anim.animType} ${curAnimClass}`} style={{ ...fontStyle }}>
        <div className="logo no-logo" style={{ ...animationStyle }}>
          <img src="//:0" style={{ maxHeight: props.logoMaxHeigh }} />
        </div>

        <div className="graph-1" style={{ ...animationStyle, ...style1.graph1 }}></div>

        <div className="text-content">
          <div className="text-mask" style={titleStyle}>
            <div style={{ ...animationStyle }}>{props.title}</div>
          </div>
          <div className="text-mask" style={textStyle}>
            <div style={{ ...animationStyle }}>{props.text}</div>
          </div>
        </div>

        <div className="graph-2" style={{ ...animationStyle, ...style1.graph2 }}></div>
      </div>
    </div>
  );
};

export default SimpleSlide;
