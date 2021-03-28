// Layout components.
import { Grid } from "@material-ui/core";
// Icons.
import {
  Filter1 as Filter1Icon,
  Settings as SettingsIcon,
} from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import AppM from "./AppM";
import FormSimpleInput from "./FormSimpleInput";
import FormTimers from "./FormTimers";
import { Panel } from "./Panel";

import { AnimateSharedLayout } from "framer-motion";

export const MainSettingsPanel: React.FC<{
  handleActiveChange?: (isActive: boolean) => void;
}> = (props) => <></>;

const Card1Panel: React.FC<{ name: string }> = (props) => {
  const [primaryText, setMainText] = useState<string>("Hello");
  const [secondaryText, setSecondaryText] = useState<string>("World");
  const [isLocalActive, setIsActive] = useState<boolean>(true);

  const isActive = isLocalActive && true;

  const handleActiveChange = (isActive: boolean) => {
    setIsActive(isActive);
  };

  useEffect(() => {
    setMainText("Quick Tip: Check out the config files on Github!");
    setSecondaryText("https://github.com/creack/dotfiles");
  }, []);

  return (
    <>
      <Panel cardId="-1">
        <>
          <Filter1Icon />
          {props.name}
        </>
        <>
          <FormSimpleInput
            label="Main text"
            value={primaryText}
            handleChange={(v) => setMainText(v)}
          />
          <FormSimpleInput
            label="Secondary text"
            value={secondaryText}
            handleChange={(v) => setSecondaryText(v)}
          />
          {/* <FormTimers label={`${props.name} Times`} /> */}
        </>
      </Panel>
      {!isActive ? null : (
        <AppM primaryText={primaryText} secondaryText={secondaryText} />
      )}
    </>
  );
};

const ControlPanel: React.FC = () => {
  const [globalIsActive, setGlobalIsActive] = useState<boolean>(true);

  const handleGlobalActiveChange = (globalIsActive: boolean) => {
    setGlobalIsActive(globalIsActive);
  };

  return (
    <div className="ControlPanel">
      <AnimateSharedLayout>
        <Grid
          container
          direction="column"
          spacing={1}
          style={{ overflow: "hidden" }}
        >
          <Grid item sm>
            <MainSettingsPanel handleActiveChange={handleGlobalActiveChange} />
          </Grid>
          <Grid item sm>
            <Card1Panel name="Card1" />
          </Grid>
        </Grid>
      </AnimateSharedLayout>
    </div>
  );
};

export default ControlPanel;
