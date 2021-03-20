import React from "react";
import { motion } from "framer-motion";
import Card, { TextStyle, CardProps } from "./Card";
import { useMotionValue, useTransform } from "framer-motion";

import {
  Filter1 as Filter1Icon,
  Settings as SettingsIcon,
} from "@material-ui/icons";

const Orig: React.FC<{ duration: number }> = ({ duration }) => (
  <Card
    primaryText={"hello"}
    secondaryText={"world"}
    align="right"
    anim={{
      animType: "style-1",
      animDurationMs: duration * 1000,
      activeDurationMs: 500,
    }}
    titleStyle={{
      fontFamily: "Fira Code, monospace",
      fontSize: "1.6em",
      color: "#F2F2F2",
    }}
    textStyle={{
      fontFamily: "Fira Code, monospace",
      fontSize: "1.4em",
      color: "#8A8A8A",
    }}
  />
);

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
    width: "calc(100% + 2em)",
    height: "calc(100% + 2em)",
    margin: "0 -1em",
    padding: "0 1em",
    boxSizing: "border-box",

    right: 0,
    marginLeft: "-1.8em",
    paddingLeft: "1.8em",
  },
};

const CardBackground: React.FC<CardProps> = (props) => {
  const duration = 4;

  return (
    <div
      style={{
        fontSize: "28px",
        bottom: "6rem",
        right: "4rem",
        flexDirection: "row-reverse",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        transition: "left 0.1s, bottom 0.1s right 0.1s",
      }}
    >
      <motion.div
        style={{
          order: 1,
          minWidth: "0.3em",
          height: "3.5em",
          background: "#47D7AC",
          boxShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",

          position: "absolute",
          bottom: 10,
        }}
        initial={{
          opacity: 0,
          x: "-6em",
        }}
        animate={{
          opacity: [0, 0, 1, 1, 1],
          x: [-100, -100, 0, 0, 0],
        }}
        transition={{
          times: [0, 0.25, 0.5, 0.75, 1],
          duration: duration,
        }}
      />

      <div
        style={{
          order: 2,
          display: "flex",
          flexDirection: "column",
          marginRight: "1.2em",
        }}
      >
        <div
          style={{
            color: "#F2F2F2",
            fontWeight: "normal",
            textTransform: "none",
            transition: "margin 0.1s height 0.1s",
            marginBottom: "0em",
            fontFamily: "Fira Code, monospace",
            fontSize: "1.6em",
            height: `calc(1.6em) + 0.25em`,
            overflow: "hidden",
            textAlign: "right",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              transition: "font-size 0.1s",
              padding: "0 0.2rem",
            }}
          >
            hello
          </div>
        </div>
        <div
          style={{
            color: "#8A8A8A",
            fontWeight: "normal",
            textTransform: "none",
            fontFamily: "Fira Code, monospace",
            fontSize: "1.4em",
            height: `calc(1.4em) + 0.25em`,

            overflow: "hidden",
            transition: "height 0.1s",
            textAlign: "right",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              transition: "font-size 0.1s",
              padding: "0 0.2rem",
            }}
          >
            world
          </div>
        </div>
      </div>

      <motion.div
        style={{
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
        }}
      />
    </div>
  );
  /*
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "200px",
          height: "300px",
          width: "100%",
        }}
      >
        <Orig duration={duration} />
      </div>

      <div
        style={{
          width: "100%",
          fontSize: "28px",
          bottom: "10px",
          right: "4rem",
          display: "flex",
          position: "absolute",
          flexDirection: "row-reverse",
          transition: "left 0.1s, bottom 0.1s, right 0.1s",
          margin: "0px -1em 0px -1.8em",
          padding: "0px 1em 0px 1.8em",
        }}
      >
        <motion.div
          style={{
            background: "rgba(55, 85, 112, 0.46)",

            position: "absolute",
            right: 0,
            bottom: "10px",

            // height: "176px",
            // width: "220px",
            height: "calc(100% + 2em)",
            width: "100%",

            borderRadius: "calc(1.264rem)",
          }}
          variants={container}
          initial="hidden"
          animate="visible"
          transition={{
            ease: [0, 0, 0, 1],
            delay: duration * 0.3,
            duration: duration - duration * 0.3,
          }}
        />
        <div
          style={{
            order: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              ...titleStyle,

              overflow: "hidden",
              transition: "height 0.1s",
              textAlign: "right",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "inline-flex",
                transition: "font-size 0.1s",
                padding: "0 0.2rem",
              }}
            >
              Hello
            </div>
          </div>
          <div
            style={{
              ...textStyle,
              overflow: "hidden",
              transition: "height 0.1s",
              textAlign: "right",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "inline-flex",
                transition: "font-size 0.1s",
                padding: "0 0.2rem",
              }}
            >
              World
            </div>
          </div>
        </div>

        <motion.div
          style={{
            position: "absolute",
            right: "30px",
            bottom: "30px",

            background: "#47D7AC",

            height: "3.5em",
            width: "0.3em",

            opacity: 1,

            boxShadow: "rgb(0 0 0 / 50%) 0.1rem 0.1rem 0.2rem",
          }}
          initial={{
            opacity: 0,
            x: "-6em",
          }}
          animate={{
            opacity: [0, 0, 1, 1, 1],
            x: [-100, -100, 0, 0, 0],
          }}
          transition={{
            times: [0, 0.25, 0.5, 0.75, 1],
            duration: duration,
          }}
        />
      </div>
    </>
  );
  return (
    <div
      style={{
        background: "lightblue",
        margin: "10px",
        width: "400px",
        height: "600px",
      }}
    >
      <motion.div
        style={{
          width: "80px",
          height: "80px",
          background: "yellow",
          opacity: 0,
        }}
        animate={{ x: 100, opacity: 1 }}
        transition={{
          duration: 1,
          loop: Infinity,
          repeatDelay: 1,
          repeatType: "reverse",
        }}
      />
    </div>
  );
  */
};

const CardBackground0: React.FC = (props) => (
  <>
    <div
      style={{
        position: "absolute",
        bottom: "200px",
        height: "300px",
        width: "100%",
      }}
    >
      <Orig duration={4} />
    </div>
    <CardBackground
      {...props}
      primaryText={"hello"}
      secondaryText={"world"}
      align="right"
      anim={{
        animType: "style-1",
        animDurationMs: 4000,
        activeDurationMs: 500,
      }}
      titleStyle={{
        fontFamily: "Fira Code, monospace",
        fontSize: "1.6em",
        color: "#F2F2F2",
      }}
      textStyle={{
        fontFamily: "Fira Code, monospace",
        fontSize: "1.4em",
        color: "#8A8A8A",
      }}
    />
  </>
);

export default CardBackground0;
