import React from "react";
import styled, { keyframes } from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";

import { slideInLeft } from "../react-animations";
import { BoxProps } from "@material-ui/core";

const slideInLeftAnimation = keyframes`${slideInLeft}`;

/* const SlideInLeftDiv = styled.div`
 *   animation: ${slideInLeftAnimation};
 *   animation-duration: 5s;
 *   animation-fill-mode: forwards;
 * `;
 *
 * const out: React.FC<BoxProps> = (props) => {
 *   return (
 *     <StylesProvider injectFirst>
 *       <SlideInLeftDiv {...props}>{props.children}</SlideInLeftDiv>
 *     </StylesProvider>
 *   );
 * };
 *  */
export default slideInLeftAnimation;
