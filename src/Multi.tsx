// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { animated, useTransition } from "react-spring";
// import "./Multi.css";
//
// const App: React.FC = () => {
//   const ref = useRef<Array<NodeJS.Timeout>>([]);
//   const [items, set] = useState<Array<string>>([]);
//   const transitions = useTransition(items, null, {
//     from: {
//       opacity: 0,
//       height: 0,
//       transform: "perspective(600px) rotateX(0deg)",
//       color: "#8fa5b6",
//     },
//     enter: [
//       { opacity: 1, height: 80 },
//       { transform: "perspective(600px) rotateX(180deg)", color: "#28d79f" },
//       { transform: "perspective(600px) rotateX(0deg)" },
//     ],
//     leave: [{ color: "#c23369" }, { opacity: 0, height: 0 }],
//     update: { color: "#28b4d7" },
//   });
//
//   const reset = useCallback(() => {
//     ref.current.map(clearTimeout);
//     ref.current = [];
//     set([]);
//     ref.current.push(
//       setTimeout(() => set(["Apples", "Oranges", "Kiwis"]), 2000),
//     );
//     ref.current.push(setTimeout(() => set(["Apples", "Kiwis"]), 5000));
//     ref.current.push(
//       setTimeout(() => set(["Apples", "Bananas", "Kiwis"]), 8000),
//     );
//   }, []);
//
//   useEffect(() => void reset(), []);
//
//   return (
//     <div>
//       {transitions.map(({ item, props: { height, ...rest }, key }) => (
//         <animated.div
//           className="transitions-item"
//           key={key}
//           style={rest}
//           onClick={reset}
//         >
//           <animated.div style={{ overflow: "hidden", height: height }}>
//             {item}
//           </animated.div>
//         </animated.div>
//       ))}
//     </div>
//   );
// };
//
// export default App;
