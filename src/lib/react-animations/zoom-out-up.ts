import { compose, scale3d, translate3d, cubicBezier } from "./utils";
import type { Animation } from "./types";
const scaleAndTranslate = compose(scale3d, translate3d);
const zoomOutUp: Animation = {
  "40%": {
    opacity: 1,
    transform: scaleAndTranslate([0.475, 0.475, 0.475], [0, "60px", 0]),
    animationTimingFunction: cubicBezier(0.55, 0.055, 0.675, 0.19),
  },
  to: {
    opacity: 0,
    transform: scaleAndTranslate([0.1, 0.1, 0.1], [0, "-2000px", 0]),
    transformOrigin: "center bottom",
    animationTimingFunction: cubicBezier(0.175, 0.885, 0.32, 1),
  },
};
export default zoomOutUp;
