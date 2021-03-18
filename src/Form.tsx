import React, { ReactElement, useEffect, useState } from "react";
/* import { Color } from "react-color";
 * import { useForm } from "react-hook-form";
 *  */
// Styles/CSS/Theme.
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// Form components.
import { InputAdornment, TextField } from "@material-ui/core";
// Layout components.
import { Grid, Paper } from "@material-ui/core";
// Icons.
import { Settings as SettingsIcon } from "@material-ui/icons";
import Panel from "./Panel";
import FormTimers from "./FormTimers";
import "./Form.css";

/* type FormData = {
 *   firstName: string;
 *   lastName: string;
 *   color: string;
 * };
 *  */
/* type stateTypes = {
 *   color: Color;
 * };
 *  */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flewGrow: 1,
    },
    paper: {
      height: 50,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    labelRoot: theme.typography.caption,
  }),
);

const MainSettingsPanel: React.FC = (): ReactElement => {
  return (
    <Panel icon={<SettingsIcon />} title="Main Settings">
      <FormTimers label="Global Times" />
    </Panel>
  );
};

const Form: React.FC = (): ReactElement => {
  /* const { handleSubmit } = useForm<FormData>();
   */
  /* const onSubmit = handleSubmit(({ firstName, lastName, color }) => {
   *   console.log(firstName, lastName, color);
   * });
   */
  /* const [state, setState] = useState<stateTypes>({
   *   color: "rgba(91,138,100,0.58)",
   * });
   */
  return (
    <>
      <MainSettingsPanel />
    </>
  );
  /* return (
   *   <form onSubmit={onSubmit}>
   *     <label>First Name</label>
   *     <input name="firstName" ref={register} />
   *     <label>Last Name</label>
   *     <input name="lastName" ref={register} />
   *     <label>Color</label>
   *     <input
   *       name="color"
   *       ref={register}
   *       onBlur={(ev) => {
   *         setState({ ...state, color: ev.target.value });
   *       }}
   *     />
   *     <SketchColorPicker
   *       color={state.color}
   *       handleChangeComplete={(newColor) => {
   *         setValue("color", newColor.color);
   *         setState({ ...state, color: newColor.color });
   *       }}
   *     />
   *     <button
   *       type="button"
   *       onClick={() => {
   *         setValue("lastName", "luo");
   *       }}
   *     >
   *       SetValue
   *     </button>
   *     <input type="submit" value="hello" />
   *   </form>
   * ); */
};

export default Form;
