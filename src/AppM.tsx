import React from "react";
import { motion } from "framer-motion";

type CardProps = {
  duration?: number | string;
  primaryText: string;
  secondaryText: string;
};

const CardBackground: React.FC<CardProps> = (props) => {
  const duration = props.duration || 4;
  const repeatType = "reverse";
  return (
    <div
      style={{
        fontSize: "14px",
        bottom: "6rem",
        right: "2rem",
        flexDirection: "row-reverse",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        transition: "left 0.1s, bottom 0.1s right 0.1s",
      }}
    >
      <div
        style={{
          order: 0,
          overflow: "hidden",
          transition: "margin 0.1s",
          minWidth: "fit-content",
        }}
      >
        <motion.img
          src="marketing-4.gif"
          style={{
            display: "flex",
            position: "relative",
            filter: "blur(0)",
            transition: "maxHeight: 0.1s",
            maxHeight: "8em",
            marginLeft: "0.8em",
          }}
          initial={{
            opacity: 0,
            left: "-30%",
          }}
          animate={{
            opacity: [0, 0, 1],
            left: ["-30%", "-30%", "0%"],
          }}
          transition={{
            ease: [0.19, 0.76, 0.32, 1],
            times: [0, 0.55, 1],
            duration: duration,
            repeat: 1,
            repeatDelay: 5,
            repeatType: repeatType,
          }}
        />
      </div>

      <motion.div
        style={{
          order: 1,
          minWidth: "0.3em",
          height: "3.5em",
          background: "#47D7AC",
          boxShadow: "0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.5)",

          position: "relative",
        }}
        initial={{
          opacity: 0,
          x: "-6em",
        }}
        animate={{
          opacity: [0, 0, 1, 1, 1],
          x: ["-6em", "-6em", "0em", "0em", "0em"],
        }}
        transition={{
          ease: [0.19, 0.76, 0.32, 1],
          times: [0, 0.25, 0.5, 0.75, 1],
          duration: duration,
          repeat: 1,
          repeatDelay: 5,
          repeatType: repeatType,
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
            fontWeight: "bold",
            textTransform: "none",
            transition: "margin 0.1s height 0.1s",
            marginBottom: "0em",
            fontFamily: "Fira Code, monospace",
            fontSize: "1.4em",
            height: `calc(1.4em) + 0.25em`,
            overflow: "hidden",
            textAlign: "right",
          }}
        >
          <motion.div
            style={{
              position: "relative",
              display: "inline-flex",
              transition: "font-size 0.1s",
              padding: "0 0.2rem",
              textShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",
            }}
            initial={{ right: "-102%" }}
            animate={{ right: ["-102%", "-102%", "0%"] }}
            transition={{
              ease: [0.19, 0.76, 0.32, 1],
              times: [0, 0.45, 1],
              duration: duration,
              repeat: 1,
              repeatDelay: 5,
              repeatType: repeatType,
            }}
          >
            {props.primaryText}
          </motion.div>
        </div>
        <div
          style={{
            color: "#8A8A8A",
            fontWeight: "lighter",
            textTransform: "none",
            fontFamily: "Fira Code, monospace",
            fontSize: "1.6em",
            height: `calc(1.6em) + 0.25em`,

            overflow: "hidden",
            transition: "height 0.1s",
            textAlign: "right",
          }}
        >
          <motion.div
            style={{
              position: "relative",
              display: "inline-flex",
              transition: "font-size 0.1s",
              padding: "0 0.2rem",
              textShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",
            }}
            initial={{ right: "-102%" }}
            animate={{ right: ["-102%", "-102%", "0%"] }}
            transition={{
              ease: [0.19, 0.76, 0.32, 1],
              times: [0, 0.5, 1],
              duration: duration,
              repeat: 1,
              repeatDelay: 5,
              repeatType: repeatType,
            }}
          >
            {props.secondaryText}
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{
          background: "rgba(55, 85, 112, 0.46)",
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
        initial={{
          width: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }}
        animate={{
          paddingLeft: ["0", "0", "-1.8em"],
          paddingRight: ["0", "0", "1.8em"],
          width: ["calc(0% + 0em)", "calc(0% + 0em)", "calc(100% + 2em)"],
        }}
        transition={{
          times: [0, 0.3, 1],
          ease: [0.19, 0.76, 0.32, 1],
          duration: duration,

          repeat: 1,
          repeatDelay: 5,
          repeatType: repeatType,
        }}
      />
    </div>
  );
};

const Card: React.FC = () => (
  <CardBackground
    primaryText="Quick Tip: Check out the config files on Github!"
    secondaryText="https://github.com/creack/dotfiles"
  />
);

export default Card;
