import React, { useEffect, useState } from "react";

// Styles/CSS/Theme.
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// Form components.
import {
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  TextFieldProps,
} from "@material-ui/core";

import {
  Lock as LockCloseIcon,
  LockOpen as LockOpenIcon,
  Timer as TimerOnIcon,
  TimerOff as TimerOffIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
);

type simpleInputPropTypes = Partial<TextFieldProps> & {
  value?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  handleChange?: (v: string) => string | void;
  InputProps?: void;
  InputLabelProps?: void;
};

/*
<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
 */

const FormSimpleInput: React.FC<simpleInputPropTypes> = ({
  value,
  onChange,
  onBlur,

  handleChange,
  startAdornment,
  endAdornment,
  ...props
}): JSX.Element => {
  const classes = useStyles();
  const [localValue, setLocalValue] = useState<string>(value ?? "");
  useEffect(() => setLocalValue(value ?? ""), [value]);

  // return (
  //   <FormControl>
  //     <InputLabel htmlFor="my-input">Email address</InputLabel>
  //     <Input
  //       id="my-input"
  //       aria-describedby="my-helper-text"
  //       endAdornment={
  //         <InputAdornment position="end">
  //           <TimerOffIcon />
  //         </InputAdornment>
  //       }
  //     />
  //     <FormHelperText id="my-helper-text">
  //       We'll never share your email.
  //     </FormHelperText>
  //   </FormControl>
  // );

  return (
    <TextField
      variant={"filled"}
      fullWidth={true}
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
        startAdornment: startAdornment && (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
        endAdornment: endAdornment && (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  );
};

export default FormSimpleInput;
