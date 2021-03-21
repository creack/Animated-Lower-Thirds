import React, { useContext } from "react";
import {
  motion,
  MotionConfig,
  MotionConfigContext,
  Keyframes,
} from "framer-motion";
import type { Property } from "csstype";
import styled from "styled-components";

type textStyleProps = {
  color?: Property.Color;
  fontFamily?: Property.FontFamily;
  fontSize?: Property.FontSize;
  fontWeight?: Property.FontWeight;
  textTransform?: Property.TextTransform;
};

type shadowProps = {
  shadowOpacity?: Property.Opacity;
};

type borderProps = {
  borderColor?: Property.BorderColor;
  borderRadius?: Property.BorderRadius;
  borderWidth?: Property.BorderWidth;
};

type flexProps = {
  order: Property.Order;
};

type logoProps = {
  src: string;
  maxHeight?: Property.MaxHeight;
};

type graphOneProps = {
  color?: Property.Color;
  minWidth?: Property.MinWidth;
  minHeight?: Property.MinHeight;
};

type graphTwoProps = {
  color?: Property.Color;
};

type CardProps = {
  durationInSecs?: number;

  primaryTextStyle?: textStyleProps;
  secondaryTextStyle?: textStyleProps;

  textSizeRatio?: number;
  lineSpacing?: Property.MarginBottom;

  cardSize?: Property.FontSize;

  margins?: {
    vertical: Property.Margin;
    horizontal: Property.Margin;
  };

  borders?: borderProps;

  logo?: logoProps;
  graphOne?: graphOneProps;
  graphTwo?: graphTwoProps;

  children: [React.ReactElement<HTMLElement>, React.ReactElement<HTMLElement>];
} & shadowProps;

const LogoDiv = styled.div<flexProps>`
  order: ${(props) => props.order};
  overflow: hidden;
  transition: margin 0.1s;
  min-width: fit-content;
`;

const LogoImg = styled(motion.img)<{ maxHeight?: Property.MaxHeight }>`
  display: flex;
  position: relative;
  transition: maxHeight: 0.1s;
  marginLeft: 0.8em;
  max-height: ${(props) => props.maxHeight ?? "8em"};
`;

const StyleOneLogo: React.FC<{ logo?: logoProps } & flexProps> = ({
  order,
  logo,
}) => {
  if (!logo) {
    return null;
  }

  const motionConfig = useContext(MotionConfigContext);

  return (
    <LogoDiv order={order}>
      <LogoImg
        src={logo.src}
        maxHeight={logo.maxHeight}
        initial={{
          opacity: 0,
          left: "-30%",
        }}
        animate={{
          opacity: [0, 0, 1],
          left: ["-30%", "-30%", "0%"],
        }}
        transition={{
          ...(motionConfig.transition as Keyframes),
          times: [0, 0.55, 1],
        }}
      />
    </LogoDiv>
  );
};

const StyleOneGraphOne: React.FC<graphOneProps & flexProps & shadowProps> = ({
  order,
  shadowOpacity,
  ...graphOne
}) => {
  const motionConfig = useContext(MotionConfigContext);

  return (
    <motion.div
      style={{
        order: order,

        minWidth: graphOne?.minWidth ?? "0.3em",
        minHeight: graphOne?.minHeight ?? "3.5em",
        background: graphOne?.color ?? "#D54141",

        boxShadow: !shadowOpacity
          ? "none"
          : `0.1rem 0.1rem 0.2rem rgba(0,0,0,${shadowOpacity})`,

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
        ...(motionConfig.transition as Keyframes),
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    />
  );
};

const StyleOneGraphTwo: React.FC<
  graphTwoProps & flexProps & shadowProps & borderProps
> = ({ order, shadowOpacity, ...graphTwo }) => {
  const motionConfig = useContext(MotionConfigContext);

  return (
    <motion.div
      style={{
        order: order,
        zIndex: -1, // TODO: Remove?

        background: graphTwo?.color ?? "#222222",

        border: `solid ${graphTwo?.borderWidth ?? "0rem"}`,
        borderColor: `${graphTwo?.borderColor ?? "none"}`,
        borderRadius: `calc(${graphTwo?.borderRadius ?? "0rem"} * 1.1)`,
        boxSizing: "border-box",

        boxShadow: !shadowOpacity
          ? "none"
          : `0.1rem 0.1rem 0.2rem rgba(0,0,0,${shadowOpacity})`,

        position: "absolute",
        width: "100%",
        height: "calc(100% + 2em)",
        margin: "0 -1em",
        padding: "0 1em",

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
        ...(motionConfig.transition as Keyframes),
        times: [0, 0.3, 1],
      }}
    />
  );
};

const StyleOneTextWrapper: React.FC<flexProps> = ({ order, children }) => (
  <div
    style={{
      order: order,
      display: "flex",
      flexDirection: "column",
      marginRight: "1.2em",
    }}
  >
    {children}
  </div>
);

const StyleOneTextContent: React.FC<
  {
    keyFrameTimes?: [number, number, number];
    marginBottom?: Property.MarginBottom;
  } & shadowProps
> = ({ children, keyFrameTimes, marginBottom, shadowOpacity }) => {
  const motionConfig = useContext(MotionConfigContext);

  return (
    <div
      style={{
        marginBottom: marginBottom,
        overflow: "hidden",
        textAlign: "right",
        transition: "margin 0.1s height 0.1s",
      }}
    >
      <motion.div
        style={{
          display: "inline-flex",
          padding: "0 0.2rem",
          position: "relative",
          transition: "font-size 0.1s",

          textShadow: !shadowOpacity
            ? "none"
            : `0.1rem 0.1rem 0.2rem rgba(0,0,0,${shadowOpacity})`,
        }}
        initial={{ right: "-102%" }}
        animate={{ right: ["-102%", "-102%", "0%"] }}
        transition={{
          ...(motionConfig.transition as Keyframes),
          times: keyFrameTimes,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const StyleOneDefaultPrimaryText = styled.div`
  color: #F2F2F2;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.9em;
  font-weight: bold,
  text-transform: uppercase,
`;
const StyleOneDefaultSecondaryText = styled.div`
  color: #8A8A8A;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.1em;
  font-weight: lighter,
  text-transform: none,
`;

const StyleOne: React.FC<CardProps> = (props) => (
  <MotionConfig
    transition={{
      duration: props.durationInSecs ?? 4,
      repeat: 1,
      repeatDelay: 500,
      repeatType: "reverse",
      ease: [0.19, 0.76, 0.32, 1], // Cubic-bezier params.
    }}
  >
    <div
      style={{
        fontSize: props.cardSize ?? "24px",
        bottom: props.margins?.vertical ?? "4rem",
        right: props.margins?.horizontal ?? "4rem",
        flexDirection: "row-reverse",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        transition: "left 0.1s, bottom 0.1s right 0.1s",
      }}
    >
      <StyleOneLogo order={0} logo={props.logo} />
      <StyleOneGraphOne
        order={1}
        {...props.graphOne}
        shadowOpacity={props.shadowOpacity}
      />
      <StyleOneTextWrapper order={2}>
        <StyleOneTextContent
          marginBottom={props.lineSpacing ?? "0.2em"}
          shadowOpacity={props.shadowOpacity}
          keyFrameTimes={[0, 0.45, 1]}
        >
          {props.children[0]}
        </StyleOneTextContent>
        <StyleOneTextContent
          shadowOpacity={props.shadowOpacity}
          keyFrameTimes={[0, 0.5, 1]}
        >
          {props.children[1]}
        </StyleOneTextContent>
      </StyleOneTextWrapper>
      <StyleOneGraphTwo
        order={3}
        {...props.graphTwo}
        {...props.borders}
        shadowOpacity={props.shadowOpacity}
      />
    </div>
  </MotionConfig>
);

const PrimaryText = styled(StyleOneDefaultPrimaryText)`
  font-family: "Fira Code", monospace;
  font-size: 1.4em;
  text-transform: none;
`;

const SecondaryText = styled(StyleOneDefaultSecondaryText)`
  font-family: "Fira Code", monospace;
  font-size: 1.6em;
`;

export type CardProps1 = {
  primaryText?: string;
  secondaryText?: string;
};

const Card: React.FC<CardProps1> = (props) => (
  <StyleOne
    logo={{ src: "marketing-4.gif" }}
    graphOne={{ color: "#47D7AC" }}
    graphTwo={{ color: "rgba(55, 85, 112, 0.46)" }}
    cardSize="14px"
    margins={{ horizontal: "2rem", vertical: "6rem" }}
    lineSpacing={0}
    shadowOpacity={0.5}
    borders={{
      borderRadius: "1.24em",
    }}
  >
    <PrimaryText>{props.primaryText}</PrimaryText>
    <SecondaryText>{props.secondaryText}</SecondaryText>
  </StyleOne>
);

export default Card;
