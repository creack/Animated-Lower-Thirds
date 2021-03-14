import React, { ReactElement, useEffect, useState } from "react";
import "./Card.css";
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

type CardProps = {
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

const Card: React.FC<CardProps> = (props): ReactElement => {
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

  const [animClass, setAnimClass] = useState("hide-anim");

  useEffect(() => {
    setAnimClass("animation-in");

    setTimeout(() => {
      setAnimClass("animation-out");

      setTimeout(() => {
        console.log("---> Hide anim.");
        setAnimClass("hide-anim");
      }, props.anim.activeDurationMs);
    }, props.anim.animDurationMs);
  }, []);

  return (
    <div className="Card">
      <div key={animClass} className={`alt ${props.align} ${props.anim.animType} ${animClass}`} style={{ ...fontStyle }}>
        <div id="alt-1-logo" className="logo no-logo" style={{ ...animationStyle }}>
          <img id="alt-1-logo-image" src="//:0" style={{ maxHeight: props.logoMaxHeigh }} />
        </div>

        <div className="graph-1" style={{ ...animationStyle, ...style1.graph1 }}></div>

        <div className="text-content">
          <div className="text-mask" style={titleStyle}>
            <div id="alt-1-name" style={{ ...animationStyle }}>
              {props.title}
            </div>
          </div>
          <div className="text-mask" style={textStyle}>
            <div id="alt-1-info" style={{ ...animationStyle }}>
              {props.text}
            </div>
          </div>
        </div>

        <div className="graph-2" style={{ ...animationStyle, ...style1.graph2 }}></div>
      </div>
    </div>
  );
};

export default Card;
