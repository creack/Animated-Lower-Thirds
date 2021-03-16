import React, { ReactElement, useState } from "react";
import { UnfoldLess, UnfoldMore } from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";
import "./Panel.css";

type panelPropTypes = {
  title: React.ReactNode;
  icon?: React.ReactNode;
};

type panelStateTypes = {
  isActive: boolean;
  isFolded: boolean;
};

const Panel: React.FC<panelPropTypes> = (props): ReactElement => {
  const [state, setState] = useState<panelStateTypes>({
    isActive: true,
    isFolded: false,
  });

  const toggleFold = () => setState({ ...state, isFolded: !state.isFolded });
  const toggleActive = () => setState({ ...state, isActive: !state.isActive });

  return (
    <div className="Panel">
      <div className="PanelTopBar">
        <div className="PanelTopBarLeft">
          <div style={{ background: "magenta" }}>
            {props.icon}
            {props.title}
          </div>
        </div>
        <div className="PanelTopBarRight">
          <div
            style={{ textAlign: "right", background: "red" }}
            onClick={toggleFold}
          >
            {state.isFolded ? <UnfoldLess /> : <UnfoldMore />}
          </div>

          <div style={{ background: "pink" }}>
            <Switch
              size="small"
              checked={state.isActive}
              color="primary"
              onChange={toggleActive}
            />
          </div>
        </div>
      </div>
      <div className="PanelContent">{props.children}</div>
    </div>
  );
};

export default Panel;
