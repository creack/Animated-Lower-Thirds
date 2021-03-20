import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";

const CardBackground: React.FC = () => {
  const delay = 1.2;
  const duration = 4;
  return (
    <div style={{ height: "300px", width: "100%", justifyContent: "flex-end" }}>
      <motion.div
        style={{
          position: "absolute",
          right: "30px",
          bottom: "30px",

          background: "rgba(55, 85, 112, 0.46)",

          height: "176px",
          minHeight: "176px",
          width: "220px",

          borderRadius: "calc(1.264rem)",
        }}
        initial={{ width: "0px" }}
        animate={{
          width: "calc(220px + 2em)",
        }}
        transition={{
          ease: [0, 0, 0, 1],
          delay: delay,
          duration: duration - delay,
        }}
      ></motion.div>
    </div>
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
};

export default CardBackground;
