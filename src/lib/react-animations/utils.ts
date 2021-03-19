// Ported from js to ts from https://bit.dev/formidablelabs/react-animations/utils@1.0.0 (MIT License).
import type { CSSValue } from "./types";

/**
 * Composes a variable number of CSS helper functions.
 * Returns a function that accepts all the original arguments
 * of the functions it composed. If the original function
 * accepted multiple arguments, they must be passed as
 * an array.
 * @example
 * const translateXandRotateY = compose(translateX, rotateY);
 * const cssValue = translateXandRotateY('-5px', '30deg');
 */
export const compose = (...funcs: Array<(...args: CSSValue[]) => CSSValue>) => {
  return (...styleArgs: Array<CSSValue | Array<CSSValue>>): CSSValue => {
    const result = funcs.reduce((acc, func, i) => {
      const arg = styleArgs[i];
      return `${acc} ${Array.isArray(arg) ? func(...arg) : func(arg)}`;
    }, "");
    return result.trim();
  };
};

export const cubicBezier = (
  a: CSSValue,
  b: CSSValue,
  c: CSSValue,
  d: CSSValue,
): CSSValue => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;

export const translate3d = (a: CSSValue, b: CSSValue, c: CSSValue): CSSValue =>
  `translate3d(${a}, ${b}, ${c})`;

export const translateX = (a: CSSValue): CSSValue => `translateX(${a})`;

export const scale3d = (a: CSSValue, b: CSSValue, c: CSSValue): CSSValue =>
  `scale3d(${a}, ${b}, ${c})`;

export const scale = (a: CSSValue): CSSValue => `scale(${a})`;

export const skewX = (deg: CSSValue): CSSValue => `skewX(${deg}deg)`;

export const skewY = (deg: CSSValue): CSSValue => `skewY(${deg}deg)`;

export const skewXY = (x: CSSValue, y: CSSValue): CSSValue =>
  `${skewX(x)} ${skewY(y)}`;

export const rotateY = (a: CSSValue): CSSValue => `rotateY(${a})`;

export const rotate3d = (
  a: CSSValue,
  b: CSSValue,
  c: CSSValue,
  d: CSSValue,
): CSSValue => `rotate3d(${a}, ${b}, ${c}, ${d}deg)`;

export const perspective = (a: CSSValue): CSSValue => `perspective(${a})`;
