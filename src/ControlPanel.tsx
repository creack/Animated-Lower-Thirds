import React, { ReactElement } from "react";
//import "./ControlPanel.css";
import Form from "./Form";

const ControlPanel: React.FC = (): ReactElement => {
  return (
    <div className="ControlPanel">
      <Form />
    </div>
  );
};

export default ControlPanel;
