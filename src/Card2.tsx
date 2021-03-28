import React, { useState } from "react";
// import type { Keyframes } from "styled-components";
// import styled, { CSSKeyframes, keyframes } from "styled-components";
// import { cubicBezier, translate3d } from "./lib/react-animations/utils";
//
// const animationRightSlash: CSSKeyframes = {
//   "0%": {
//     opacity: 0,
//     transform: translate3d("-6em", 0, 0),
//   },
//   "25%": {
//     opacity: 0,
//     transform: translate3d("-6em", 0, 0),
//   },
//   "50%": {
//     opacity: 1,
//   },
//   "75%": {
//     transform: translate3d(0, 0, 0),
//   },
//   "100%": {
//     transform: translate3d(0, 0, 0),
//   },
// };
//
// const animationRightSlashKeyframes = keyframes(animationRightSlash);
//
// const Graph01 = styled.div<{
//   keyframes: Keyframes;
//   direction?: "normal" | "reverse";
//   duration?: string;
//   hidden?: boolean;
// }>`
//   animation: ${(props) => props.keyframes};
//   animation-timing-function: ${cubicBezier(0.19, 0.76, 0.32, 1)};
//   animation-duration: ${(props) => props.duration || "0"};
//   animation-iteration-count: 1;
//   animation-direction: ${(props) => props.direction || "normal"};
//   animation-fill-mode: both;
//   ${(props) => (props.hidden ? "display : none;" : "")}
//   order: 1;
//   min-width: 0.3em;
//   height: 3.5em;
//   background: #47d;
//   box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.5);
//   border: 2px solid red;
//   position: absolute;
//   top: 10;
// `;
//
// const GrRoot = styled.div({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   position: "absolute",
//   transition: "left 0.1s, bottom 0.1s, right 0.1s",
//   fontSize: "28px",
//   bottom: "6rem",
//   right: "4rem",
//   flexDirection: "row-reverse",
// });
//
// const G0: React.FC<{
//   duration?: string;
//   reverse?: boolean;
//   hidden?: boolean;
// }> = ({ duration, reverse, hidden }) => {
//   return (
//     <Graph01
//       keyframes={animationRightSlashKeyframes}
//       duration={duration}
//       direction={reverse ? "reverse" : "normal"}
//       hidden={hidden}
//     />
//   );
// };
//
// const steps = [
//   <G0 hidden />,
//   <G0 duration="4s" />,
//   <G0 duration="500ms" hidden />,
//   <G0 duration="4s" reverse />,
//   <G0 duration="1s" hidden />,
// ];
//
const Card: React.FC = () => {
  return <></>;
};

//  const [step, setStep] = useState<number>(0);
//
//  return (
//    <GrRoot
//      onAnimationEnd={() => {
//        setStep((step + 1) % 5);
//      }}
//      key={step}
//    >
//      {steps[step]}
//    </GrRoot>
//  );
//};

export default Card;
