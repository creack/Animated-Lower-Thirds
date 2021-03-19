import styled, { keyframes } from "styled-components";
import type { Keyframes } from "styled-components";
import type { Animation } from "./react-animations/types";

const _ = styled.div``;

function makeAnimation(keyframes: Keyframes, extra: string): typeof _;
function makeAnimation(animation: Animation, extra: string): typeof _;

function makeAnimation(p: Keyframes | Animation, extra: string): typeof _ {
  if (typeof p.getName === "function") {
    return makeAnimationFromKeyFrames(p as Keyframes, extra);
  }
  return makeAnimationFromAnimation(p as Animation, extra);
}

function makeAnimationFromKeyFrames(
  keyframes: Keyframes,
  extra: string,
): typeof _ {
  return styled.div`
    animation: ${keyframes};
    ${extra};
  `;
}

function makeAnimationFromAnimation(
  animation: Animation,
  extra: string,
): typeof _ {
  return makeAnimationFromKeyFrames(keyframes`${animation}`, extra);
}

export type { Keyframes };
export default makeAnimation;
