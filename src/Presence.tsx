import { Grid, Switch } from "@material-ui/core";
import {
  Settings as SettingsIcon,
  UnfoldLess as UnfoldLessIcon,
  UnfoldMore as UnfoldMoreIcon,
} from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import FormTimers from "./FormTimers";

// Either jsut an Icon, or just a text (as string or jsx), or icon + text (as string or jsx).
type TopBarTitleType =
  | JSX.Element
  | string
  | [JSX.Element, JSX.Element | string];

const TopBarRootDiv = styled.div`
  margin-bottom: 1px;
`;

const PanelContentDiv = styled(motion.div)`
  overflow: hidden;
`;

const PanelRootDiv = styled.div`
  margin-bottom: 10px;
`;

const TopBar: React.FC<{
  expanded: boolean;
  setExpanded: (v: boolean) => void;

  children: TopBarTitleType;
}> = ({ expanded, setExpanded, children }) => {
  const FoldIcon = () => (
    <div onClick={() => setExpanded(!expanded)}>
      {!expanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
    </div>
  );

  return (
    <TopBarRootDiv>
      <Grid container justify="space-between" alignItems="center">
        <Grid container item sm={10} alignItems="center">
          {children}
        </Grid>
        <Grid container item sm={2} justify="flex-end" alignItems="center">
          <FoldIcon />
          <Switch
            size="small"
            checked={expanded}
            color="primary"
            onChange={() => {
              setExpanded(!expanded);
            }}
          />
        </Grid>
      </Grid>
    </TopBarRootDiv>
  );
};

type PanelProps = {
  children: [
    React.ReactElement<TopBarTitleType> | string,
    React.ReactElement | string,
  ];
};

const Panel: React.FC<PanelProps> = ({ children }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const isOpen = expanded;

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <PanelRootDiv>
      <TopBar expanded={expanded} setExpanded={setExpanded}>
        {children[0]}
      </TopBar>
      <AnimatePresence initial={false}>
        {isOpen && (
          <PanelContentDiv
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children[1]}
          </PanelContentDiv>
        )}
      </AnimatePresence>
    </PanelRootDiv>
  );
};

export const Example: React.FC = () => {
  return (
    <>
      <Panel>
        <>
          <SettingsIcon />
          Main Settings
        </>
        <FormTimers label="Global Times" />
      </Panel>
    </>
  );
};

export default Example;
