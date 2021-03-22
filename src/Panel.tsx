// Layout components.
import { Grid, Switch } from "@material-ui/core";
// Icons.
import {
  UnfoldLess as UnfoldLessIcon,
  UnfoldMore as UnfoldMoreIcon,
} from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { withTheme, Theme } from "@material-ui/core/styles";

const TopBarRoot = withTheme(styled(Grid)<{ disabled?: boolean }>`
  margin-bottom: 1px;
  background: ${(props: { theme: Theme; disabled?: boolean }) =>
    props.disabled
      ? props.theme.palette.action.disabledBackground
      : props.theme.palette.background.default};
`);

// Either jsut an Icon, or just a text (as string or jsx), or icon + text (as string or jsx).
type TopBarTitleType =
  | JSX.Element
  | string
  | [JSX.Element, JSX.Element | string];

export const TopBar: React.FC<{
  isEnabled: boolean;
  isVisible: boolean;
  toggleIsEnabled: () => void;
  toggleIsVisible: () => void;

  children: TopBarTitleType;
}> = ({ isEnabled, isVisible, toggleIsEnabled, toggleIsVisible, children }) => {
  const FoldIcon = () => (
    <div onClick={toggleIsVisible}>
      {!isVisible ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
    </div>
  );

  return (
    <TopBarRoot
      disabled={!isEnabled}
      container
      justify="space-between"
      alignItems="center"
    >
      <Grid container item sm={10} alignItems="center">
        {children}
      </Grid>
      <Grid container item sm={2} justify="flex-end" alignItems="center">
        <FoldIcon />
        <Switch
          size="small"
          checked={isEnabled}
          color="primary"
          onChange={toggleIsEnabled}
        />
      </Grid>
    </TopBarRoot>
  );
};

const PanelRootDiv = styled.div`
  margin-bottom: 10px;
`;

const PanelContentDiv = styled(motion.div)`
  overflow: hidden;
`;

type panelState = { enabled: boolean; visible: boolean };

type PanelProps = {
  handleVisibilityChange?: (s: boolean) => void;
  handleEnabledChange?: (s: boolean) => void;
  children: [
    React.ReactElement<TopBarTitleType> | string,
    React.ReactElement | string,
  ];
} & Partial<panelState>;

export const Panel: React.FC<PanelProps> = ({
  children,
  handleEnabledChange,
  handleVisibilityChange,
  enabled,
  visible,
}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(enabled ?? false);
  const [isVisible, setIsVisible] = useState<boolean>(visible ?? false);

  const toggleIsEnabled = () => {
    const v = !isEnabled;
    setIsEnabled(v);
    handleEnabledChange?.(v);
  };
  const toggleIsVisible = () => {
    if (!isEnabled) return;
    const v = !isVisible;
    setIsVisible(v);
    handleVisibilityChange?.(v);
  };

  useEffect(() => {
    if (enabled != isEnabled) setIsEnabled(enabled ?? isEnabled);
    if (visible != isVisible) setIsVisible(visible ?? isVisible);
  }, [enabled, visible]);

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <PanelRootDiv>
      <TopBar
        isEnabled={isEnabled}
        isVisible={isEnabled && isVisible}
        toggleIsEnabled={toggleIsEnabled}
        toggleIsVisible={toggleIsVisible}
      >
        {children[0]}
      </TopBar>
      <AnimatePresence initial={false}>
        {isVisible && (
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

export default Panel;
