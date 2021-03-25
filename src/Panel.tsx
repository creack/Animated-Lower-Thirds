import React, { useEffect, useState } from "react";
// Layout components.
import { Grid, Switch } from "@material-ui/core";
// Styles/CSS/Theme.
import {
  withTheme,
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
// Icons.
import {
  UnfoldLess as UnfoldLessIcon,
  UnfoldMore as UnfoldMoreIcon,
} from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "./app/store";
import { selectCardById, updateCard } from "./features/cards/cardsSlice";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    root: (props?: { disabled?: boolean }) => ({
      color: props?.disabled ? palette.action.disabled : palette.action.active,
      background: props?.disabled
        ? palette.action.disabledBackground
        : palette.background.paper,
    }),
    topBarRoot: () => ({
      marginBottom: "1px",
    }),
    panelContent: () => ({
      overflow: "hidden",
    }),
  }),
);

// Either jsut an Icon, or just a text (as string or jsx), or icon + text (as string or jsx).
type TopBarTitleType =
  | JSX.Element
  | string
  | [JSX.Element, JSX.Element | string];

export const TopBar: React.FC<{
  cardId: string;
  children: TopBarTitleType;
}> = ({ cardId, children }) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => selectCardById(state, cardId));
  const classes = useStyles({ disabled: !card?.enabled });
  if (!card) return null;

  const FoldIcon = () => (
    <div
      onClick={() =>
        dispatch(updateCard({ id: cardId, visible: !card.visible }))
      }
    >
      {!card.visible ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
    </div>
  );

  return (
    <Grid
      className={classes.topBarRoot}
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
          checked={!!card.enabled}
          color="primary"
          onChange={() =>
            dispatch(updateCard({ id: cardId, enabled: !card.enabled }))
          }
        />
      </Grid>
    </Grid>
  );
};

type PanelProps = {
  cardId: string;
  children: [
    React.ReactElement<TopBarTitleType> | string,
    React.ReactElement | string,
  ];
};

export const Panel: React.FC<PanelProps> = ({ children, cardId }) => {
  const card = useAppSelector((state) => selectCardById(state, cardId));
  const classes = useStyles({ disabled: !card?.enabled });
  //if (!card) throw "Fail: missing card";
  if (!card) return null;

  return (
    <div className={classes.root}>
      <TopBar cardId={cardId}>{children[0]}</TopBar>
      <AnimatePresence initial={false}>
        {card.visible && (
          <motion.div
            className={classes.panelContent}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Panel;
