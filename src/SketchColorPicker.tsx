import React, { ReactElement, useEffect, useState } from "react";
import reactCSS from "reactcss";
import { RGBColor, Color, ColorResult, SketchPicker } from "react-color";
import { Property } from "csstype";

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
  const propsIsRGB = propsColor.r !== undefined;

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
    setState({ ...state, color: { rgb: color.rgb, color: rgbColorToString(color.rgb) } });
  };

  const handleChangeComplete = (color: ColorResult) => {
    props.handleChangeComplete?.({ rgb: color.rgb, color: rgbColorToString(color.rgb) });
  };

  const positionAbsolute: Property.Position = "absolute";
  const positionFixed: Property.Position = "fixed";

  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: state.color.color,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: positionAbsolute,
        zIndex: 2,
      },
      cover: {
        position: positionFixed,
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div>
      <div style={{ display: "inline" }}>
        <div style={styles.swatch} onClick={handleClick}>
          <div style={styles.color} />
        </div>
      </div>
      {state.displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={state.color.color} onChange={handleChange} onChangeComplete={handleChangeComplete} />
        </div>
      ) : null}
    </div>
  );
};

export default SketchColorPicker;
