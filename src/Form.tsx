import React, { ReactElement, useState } from "react";
import { Color } from "react-color";
import { useForm } from "react-hook-form";
import SketchColorPicker from "./SketchColorPicker";
import { Settings as SettingsIcon } from "@material-ui/icons";
import Panel from "./Panel";
import "./Form.css";

type FormData = {
  firstName: string;
  lastName: string;
  color: string;
};

type stateTypes = {
  color: Color;

  mainSettingsActive: boolean;
};

const App: React.FC = (): ReactElement => {
  return (
    <div className="CardSettings">
      <div className="grid-container">
        <div className="Alignment">Hello</div>
        <div className="StyleType">a</div>
        <div className="TextSize">a</div>
        <div className="Spacing">a</div>
        <div className="LogoSize">a</div>
        <div className="Shadows">a</div>
        <div className="RoundCorner">a</div>
        <div className="Borders">a</div>
        <div className="Size">a</div>
        <div className="Margins">a</div>
        <div className="Font">a</div>
        <div className="MainColors">a</div>
        <div className="BorderColors">a</div>
        <div className="Logo">a</div>
        <div className="MainText">a</div>
        <div className="SecondaryText">a</div>
        <div className="MainTextControls">a</div>
        <div className="SecondaryTextControls">a</div>
      </div>
    </div>
  );
};

const Form: React.FC = (): ReactElement => {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>();

  const onSubmit = handleSubmit(({ firstName, lastName, color }) => {
    console.log(firstName, lastName, color);
  });

  const [state, setState] = useState<stateTypes>({
    color: "rgba(91,138,100,0.58)",
    mainSettingsActive: true,
  });

  const toggleGlobalSettings = () =>
    setState({ ...state, mainSettingsActive: !state.mainSettingsActive });

  return (
    <Panel icon={<SettingsIcon />} title="Main Settings">
      <App />
    </Panel>
  );
  return (
    <form onSubmit={onSubmit}>
      <label>First Name</label>
      <input name="firstName" ref={register} />
      <label>Last Name</label>
      <input name="lastName" ref={register} />
      <label>Color</label>
      <input
        name="color"
        ref={register}
        onBlur={(ev) => {
          setState({ ...state, color: ev.target.value });
        }}
      />
      <SketchColorPicker
        color={state.color}
        handleChangeComplete={(newColor) => {
          setValue("color", newColor.color);
          setState({ ...state, color: newColor.color });
        }}
      />
      <button
        type="button"
        onClick={() => {
          setValue("lastName", "luo");
        }}
      >
        SetValue
      </button>
      <input type="submit" value="hello" />
    </form>
  );
};

export default Form;
