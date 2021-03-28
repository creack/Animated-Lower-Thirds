// Form components.
import { InputAdornment, TextField, TextFieldProps } from "@material-ui/core";
// Styles/CSS/Theme.
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .MuiIconButton-root": {
        margin: 0,
        padding: 0,
      },
    },
    label: {
      fontSize: "0.75em",
    },
    input: {
      fontSize: "0.75em",
    },
    startAdornment: {
      fontSize: "0.4em",
      alignItems: "bottom",
    },
  }),
);

type simpleInputPropTypes = Partial<TextFieldProps> & {
  value?: string;
  startAdornment?: string | false;
  endAdornment?: React.ReactNode | false;

  label?: string;

  handleChange?: (v: string) => string | void;
  InputProps?: void;
  InputLabelProps?: void;
};

const FormSimpleInput: React.FC<simpleInputPropTypes> = ({
  value,
  onChange,
  onBlur,
  fullWidth,
  label,

  handleChange,
  endAdornment,
  startAdornment,
  ...props
}) => {
  const classes = useStyles();
  const [localValue, setLocalValue] = useState<string>(value ?? "");
  useEffect(() => setLocalValue(value ?? ""), [value]);

  return (
    <TextField
      variant="filled"
      fullWidth={fullWidth ?? true}
      className={classes.root}
      value={localValue}
      onChange={(ev) => {
        setLocalValue(ev.target.value);
        onChange?.(ev);
      }}
      onBlur={(ev) => {
        setLocalValue(handleChange?.(ev.target.value) || ev.target.value);
        onBlur?.(ev);
      }}
      InputProps={{
        className: classes.input,
        startAdornment: startAdornment && (
          <InputAdornment className={classes.startAdornment} position="start">
            <>{startAdornment}</>
          </InputAdornment>
        ),
        endAdornment: endAdornment && (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
      label={label}
      InputLabelProps={{ className: classes.label }}
      {...props}
    />
  );
};

export default FormSimpleInput;
