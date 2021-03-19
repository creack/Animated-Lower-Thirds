import { translate3d } from "./utils";
import type { Animation } from "./types";
const fadeOutDownBig: Animation = {
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
    transform: translate3d(0, "2000px", 0),
  },
};
export default fadeOutDownBig;
