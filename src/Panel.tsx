import React, { useContext, useState } from "react";
// Styles/CSS/Theme.
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// Layout components.
import { Grid, Paper, Switch } from "@material-ui/core";
// Icons.
import {
  UnfoldLess as UnfoldLessIcon,
  UnfoldMore as UnfoldMoreIcon,
} from "@material-ui/icons";
import { MainSettingsContext } from "./MainSettingsContext";

import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperRoot: {
      padding: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    paperDisabled: {
      padding: theme.spacing(1),
      background: theme.palette.action.disabled,
    },
  }),
);

type panelPropTypes = {
  title: string;
  icon?: React.ReactNode;

  handleActiveChange?: (isActive: boolean) => void;
};

type topBarPropTypes = panelPropTypes & {
  active: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  folded: [boolean, React.Dispatch<React.SetStateAction<boolean>> | null];
};

const GridTopBarRoot = styled(Grid)`
  background: yellow;
`;

export const TopBar: React.FC<topBarPropTypes> = (props) => {
  const [isActive, setIsActive] = props.active;
  const [isFolded, setIsFolded] = props.folded;

  const foldIcon = (
    <div
      onClick={() => {
        setIsFolded?.(!isFolded);
      }}
    >
      {!isFolded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
    </div>
  );

  return (
    <GridTopBarRoot container justify="space-between" alignItems="center">
      <Grid container item sm={10} alignItems="center">
        {props.icon}
        {props.title}
      </Grid>

      <Grid container item sm={2} justify="flex-end" alignItems="center">
        {foldIcon}
        <Switch
          size="small"
          checked={isActive}
          color="primary"
          onChange={() => {
            setIsActive(!isActive);
            props.handleActiveChange?.(!isActive);
          }}
        />
      </Grid>
    </GridTopBarRoot>
  );
};

export const TopBar0: React.FC<topBarPropTypes> = (props) => {
  const [isActive, setIsActive] = props.active;
  const [isFolded, setIsFolded] = props.folded;

  const foldIcon = (
    <div
      onClick={() => {
        setIsFolded?.(!isFolded);
      }}
    >
      {!isFolded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
    </div>
  );

  return (
    <GridTopBarRoot container justify="space-between" alignItems="center">
      <Grid container item sm={10} alignItems="center">
        {props.icon}
        {props.title}
      </Grid>

      <Grid container item sm={2} justify="flex-end" alignItems="center">
        {foldIcon}
        <Switch
          size="small"
          checked={isActive}
          color="primary"
          onChange={() => {
            setIsActive(!isActive);
            props.handleActiveChange?.(!isActive);
          }}
        />
      </Grid>
    </GridTopBarRoot>
  );
};

const GridRoot = styled(Grid)`
  background: blue;
`;

const Panel: React.FC<panelPropTypes> = (props) => {
  const classes = useStyles();

  const activeState = useState<boolean>(true);
  const foldedState = useState<boolean>(false);
  const [isLocalActive, setIsActive] = activeState;
  const [isFolded] = foldedState;

  const isActive = isLocalActive && useContext(MainSettingsContext).isActive;

  return (
    <GridRoot container direction="column" style={{ overflow: "hidden" }}>
      <TopBar
        {...props}
        active={[isActive, setIsActive]}
        folded={isActive ? foldedState : [true, null]}
        handleActiveChange={props.handleActiveChange}
      />

      {props.children}
    </GridRoot>
  );
};

export default Panel;
