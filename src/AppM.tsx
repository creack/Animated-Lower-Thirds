import { Grid } from "@material-ui/core";
// Styles/CSS/Theme.
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import type { Property } from "csstype";
import { motion, Transition } from "framer-motion";
import React from "react";

const useStyles = makeStyles<Theme, CardStyles1>(() =>
  createStyles({
    root: {
      fontSize: ({ root }) => root?.fontSize ?? "24px",
      bottom: ({ root }) => root?.bottom ?? "4rem",
      right: ({ root }) => root?.right ?? "4rem",

      flexDirection: "row-reverse",
      display: "flex",
      alignItems: "center",
      position: "absolute",
      transition: "left 0.1s, bottom 0.1s right 0.1s",
    },
    graphOne: {
      order: 1,
      minWidth: ({ graphOne }) => graphOne?.minWidth ?? "0.3em",
      minHeight: ({ graphOne }) => graphOne?.minHeight ?? "3.5em",
      background: ({ graphOne }) => graphOne?.color ?? "#D54141",
      boxShadow: ({ shadowOpacity }) =>
        !shadowOpacity
          ? "none"
          : `0.1rem 0.1rem 0.2rem rgba(0,0,0,${shadowOpacity})`,
      position: "relative",
    },
    graphTwo: {
      order: 3,
      zIndex: -1,

      background: ({ graphTwo }) => graphTwo?.color ?? "#222222",

      border: ({ borders }) => `solid ${borders?.borderWidth ?? "0rem"}`,
      borderColor: ({ borders }) => `${borders?.borderColor ?? "none"}`,
      borderRadius: ({ borders }) =>
        `calc(${borders?.borderRadius ?? "0rem"} * 1.1)`,
      boxSizing: "border-box",

      boxShadow: ({ shadowOpacity }) =>
        !shadowOpacity
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
    },
    textRoot: {
      order: 2,

      marginBottom: ({ lineSpacing }) => lineSpacing, // Defaults to undefined.
      overflow: "hidden",
      textAlign: "right",
      transition: "margin 0.1s height 0.1s",
    },
    textContentMotion: {
      display: "inline-flex",
      padding: "0 0.2rem",
      position: "relative",
      transition: "font-szie 0.1s",
      textShadow: ({ shadowOpacity }) =>
        !shadowOpacity
          ? "none"
          : `0.1rem 0.1rem 0.2rem rgba(0,0,0,${shadowOpacity})`,
    },
    primaryText: {
      color: ({ primaryTextColor }) => primaryTextColor ?? "#F2F2F2",
      fontFamily: "'Fira Code', monospace",
      fontSize: "1.4em",
      fontWeight: "bold",
      textTransform: "none",
    },
    secondaryText: {
      color: ({ secondaryTextColor }) => secondaryTextColor ?? "#8A8A8A",
      fontFamily: "'Fira Code', monospace",
      fontSize: "1.6em",
      fontWeight: "lighter",
      textTransform: "none",
    },
    logoRoot: {
      orger: 0,
      overflow: "hidden",
      transition: "margin 0.1s",
      minWidth: "fit-content",
    },
    logo: {
      display: "flex",
      position: "relative",
      transition: "maxHeight: 0.1s",
      marginLeft: "0.8em",
      maxHeight: ({ logoHeight }) => logoHeight ?? "8em",
    },
  }),
);

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

const StyleOne: React.FC<CardProps> = (props) => {
  const classes = useStyles({
    root: {
      fontSize: props.cardSize,
      bottom: props.margins?.vertical,
      right: props.margins?.horizontal,
    },
    graphOne: props.graphOne,
    graphTwo: props.graphTwo,

    logoHeight: props.logo?.maxHeight,

    borders: props.borders,
    lineSpacing: props.lineSpacing,
    shadowOpacity: props.shadowOpacity,
  });

  const motionConfig: Transition = {
    duration: props.durationInSecs ?? 4,
    repeat: 1,
    repeatDelay: 5,
    repeatType: "reverse",
    ease: [0.19, 0.76, 0.32, 1], // Cubic-bezier params.
  };

  return (
    <Grid className={classes.root}>
      <Grid className={classes.logoRoot}>
        {props.logo?.src && (
          <motion.img
            src={props.logo.src}
            className={classes.logo}
            initial={{ opacity: 0, left: "-30%" }}
            animate={{ opacity: [0, 0, 1], left: ["-30%", "-30%", "0%"] }}
            transition={{
              ...motionConfig,
              times: [0, 0.55, 1],
            }}
          />
        )}
      </Grid>

      <motion.div
        className={classes.graphOne}
        initial={{ opacity: 0, x: "-6em" }}
        animate={{
          opacity: [0, 0, 1, 1, 1],
          x: ["-6em", "-6em", "0em", "0em", "0em"],
        }}
        transition={{
          ...motionConfig,
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      />

      <Grid className={classes.textRoot}>
        <Grid>
          <motion.div
            className={classes.textContentMotion}
            initial={{ right: "-102%" }}
            animate={{ right: ["-102%", "-102%", "0%"] }}
            transition={{ ...motionConfig, times: [0, 0.45, 1] }}
          >
            {props.children[0]}
          </motion.div>
        </Grid>
        <Grid>
          <motion.div
            className={classes.textContentMotion}
            initial={{ right: "-102%" }}
            animate={{ right: ["-102%", "-102%", "0%"] }}
            transition={{ ...motionConfig, times: [0, 0.5, 1] }}
          >
            {props.children[1]}
          </motion.div>
        </Grid>
      </Grid>

      <motion.div
        className={classes.graphTwo}
        initial={{ width: 0, paddingLeft: 0, paddingRight: 0 }}
        animate={{
          paddingLeft: ["0", "0", "-1.8em"],
          paddingRight: ["0", "0", "1.8em"],
          width: ["calc(0% + 0em)", "calc(0% + 0em)", "calc(100% + 2em)"],
        }}
        transition={{
          ...motionConfig,
          times: [0, 0.3, 1],
        }}
      />
    </Grid>
  );
};

//const PrimaryText = styled(StyleOneDefaultPrimaryText)`
//  font-family: "Fira Code", monospace;
//  font-size: 1.4em;
//  text-transform: none;
//`;
//
//const SecondaryText = styled(StyleOneDefaultSecondaryText)`
//  font-family: "Fira Code", monospace;
//  font-size: 1.6em;
//`;

export type CardStyles1 = Partial<{
  root: Partial<{
    fontSize: Property.FontSize;
    bottom: Property.Bottom;
    right: Property.Right;
  }>;

  graphOne: Partial<{
    color: Property.Color;
    minWidth: Property.MinWidth;
    minHeight: Property.MinHeight;
  }>;

  graphTwo: Partial<{
    color: Property.Color;
  }>;

  borders: Partial<{
    borderColor: Property.BorderColor;
    borderRadius: Property.BorderRadius;
    borderWidth: Property.BorderWidth;
  }>;

  primaryTextColor: Property.Color;
  secondaryTextColor: Property.Color;
  logoHeight: Property.MaxHeight;

  lineSpacing: Property.MarginBottom;
  shadowOpacity: Property.Opacity;
}>;

export type CardProps1 = {
  primaryText?: string;
  secondaryText?: string;
} & CardStyles1;

const Card: React.FC<CardProps1> = (props) => {
  const classes = useStyles({
    primaryTextColor: props.primaryTextColor ?? "#F2F2F2",
    secondaryTextColor: props.secondaryTextColor ?? "#8A8A8A",
  });

  return (
    <StyleOne
      logo={{ src: "marketing-4.gif" }}
      graphOne={{ color: "#47D7AC" }}
      graphTwo={{ color: "rgba(55,85,112,0.46)" }}
      cardSize="14px"
      margins={{ horizontal: "2rem", vertical: "6rem" }}
      lineSpacing={0}
      shadowOpacity={0.5}
      borders={{
        borderRadius: "1.24em",
      }}
    >
      <div className={classes.primaryText}>{props.primaryText}</div>
      <div className={classes.secondaryText}>{props.secondaryText}</div>
    </StyleOne>
  );
};

export default Card;
