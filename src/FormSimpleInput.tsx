import React, { useEffect, useState } from "react";

// Styles/CSS/Theme.
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// Form components.
import { InputAdornment, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    inputField: {
      fontSize: "0.8rem",
    },
    labelRoot: theme.typography.caption,
  }),
);

type simpleInputPropTypes = {
  value?: string;
  startAbornment?: React.ReactNode;
  endAbornment?: React.ReactNode;
  inputType?: "number" | "text";
  disabled?: boolean;
  label?: string;
  onChange?: (v: string) => string | void;
};

const FormSimpleInput: React.FC<simpleInputPropTypes> = (props) => {
  const classes = useStyles();
  const [localValue, setLocalValue] = useState<string>(props.value || "");
  useEffect(() => setLocalValue(props.value || ""), [props.value]);

  return (
    <TextField
      onChange={(ev) => setLocalValue(ev.target.value)}
      onBlur={(ev) =>
        setLocalValue(props.onChange?.(ev.target.value) || ev.target.value)
      }
      value={localValue}
      type={props.inputType}
      disabled={props.disabled}
      className={classes.textField}
      size="small"
      label={props.label}
      InputProps={{
        classes: { input: classes.inputField },
        startAdornment: props.startAbornment && (
          <InputAdornment position="start">
            {props.startAbornment}
          </InputAdornment>
        ),
        endAdornment: props.endAbornment && (
          <InputAdornment position="end">{props.endAbornment}</InputAdornment>
        ),
      }}
      InputLabelProps={{ classes: { root: classes.labelRoot } }}
    />
  );
};

export default FormSimpleInput;
