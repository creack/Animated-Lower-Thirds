import React, { ReactElement, useEffect, useState } from "react";
import { RGBColor, Color, ColorResult, SketchPicker } from "react-color";

// Styles/CSS/Theme.
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline",
    },
    color: ({ color }: { color: string }) => ({
      width: "11em",
      minHeight: "1em",
      textAlign: "center",
      background: color,
      color: theme.palette.getContrastText(color),
      overflow: "hidden",
      marginLeft: "2px",
      marginRight: "2px",
    }),
    swatch: {
      borderRadius: "1px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
      display: "inline-block",
      cursor: "pointer",
    },
    popover: {
      background: "blue",
      position: "fixed",
      zIndex: 2,
    },
    cover: {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  }),
);

export type PickedColor = {
  rgb: RGBColor;
  color: string;
};

type propTypes = {
  handleChangeComplete?: (c: PickedColor) => void;
  color?: Color;
};

type stateTypes = {
  displayColorPicker: boolean;
  color: PickedColor;
};

export const rgbColorToString = (c: RGBColor): string => {
  if (c.a === 1) {
    return (
      "#" +
      [c.r, c.g, c.b]
        .map((v) => v.toString(16))
        .map((v) => (v.length == 1 ? "0" + v : v))
        .join("")
    );
  }
  return `rgba(${c.r},${c.g},${c.b},${c.a})`;
};

const colorFromProps = (color?: Color): PickedColor => {
  const propsColor = color as RGBColor;
  const propsIsRGB = propsColor?.r !== undefined;

  return {
    rgb: propsIsRGB ? propsColor : { r: 0, g: 0, b: 0, a: 0 },
    color: propsIsRGB ? rgbColorToString(propsColor) : (color as string),
  };
};

const SketchColorPicker: React.FC<propTypes> = (props): ReactElement => {
  const [state, setState] = useState<stateTypes>({
    displayColorPicker: false,
    color: colorFromProps(props.color),
  });
  const classes = useStyles({ color: state.color.color });

  useEffect(() => {
    setState({ ...state, color: colorFromProps(props.color) });
  }, [props.color]);

  const handleClick = () => {
    setState({ ...state, displayColorPicker: !state.displayColorPicker });
  };

  const handleClose = () => {
    setState({ ...state, displayColorPicker: false });
  };

  const handleChange = (color: ColorResult) => {
    setState({
      ...state,
      color: { rgb: color.rgb, color: rgbColorToString(color.rgb) },
    });
  };

  const handleChangeComplete = (color: ColorResult) => {
    props.handleChangeComplete?.({
      rgb: color.rgb,
      color: rgbColorToString(color.rgb),
    });
  };

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.swatch} onClick={handleClick}>
          <div className={classes.color}>{state.color.color}</div>
        </div>
      </div>
      {state.displayColorPicker ? (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={handleClose} />
          <SketchPicker
            color={state.color.color}
            onChange={handleChange}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SketchColorPicker;
