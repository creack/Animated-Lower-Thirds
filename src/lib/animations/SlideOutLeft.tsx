import React from "react";
import styled, { keyframes } from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";

import { slideOutLeft } from "../react-animations";
import { BoxProps } from "@material-ui/core";

const slideOutLeftAnimation = keyframes`${slideOutLeft}`;

/* const SlideOutLeftDiv = styled.div`
 *   animation: ${slideOutLeftAnimation};
 *   animation-duration: 5s;
 *   animation-fill-mode: forwards;
 * `;
 *
 * const out: React.FC<BoxProps> = (props) => {
 *   return (
 *     <StylesProvider injectFirst>
 *       <SlideOutLeftDiv {...props}>{props.children}</SlideOutLeftDiv>
 *     </StylesProvider>
 *   );
 * };
 *  */
export default slideOutLeftAnimation;
