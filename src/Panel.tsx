// Layout components.
import { Box, Grid, Switch } from "@material-ui/core";
// Styles/CSS/Theme.
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// Icons.
import {
  UnfoldLess as UnfoldLessIcon,
  UnfoldMore as UnfoldMoreIcon,
} from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
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
      " & .MuiGrid-item": {
        //border: "1px solid blue",
      },
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
  canBeEnabled: boolean;
  children: TopBarTitleType;
}> = ({ cardId, canBeEnabled, children }) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => selectCardById(state, cardId));

  useEffect(() => {
    return;
  }, [canBeEnabled]);

  const classes = useStyles({ disabled: !canBeEnabled || !card?.enabled });

  if (!card) return null;

  const FoldIcon = () => (
    <div
      onClick={() =>
        dispatch(
          updateCard({ id: cardId, changes: { visible: !card.visible } }),
        )
      }
    >
      {!card.visible ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
    </div>
  );

  console.log("Rerender topbar", canBeEnabled);

  return (
    <Grid
      className={classes.topBarRoot}
      container
      justify="space-between"
      alignItems="center"
    >
      <Grid container item xs={6} alignItems="center">
        {children}
      </Grid>
      <Grid container item xs={6} justify="flex-end" alignItems="center">
        {!canBeEnabled && (
          <Box fontWeight="light" fontSize="0.2em" fontStyle="italic">
            *Disabled in Main Settings.
          </Box>
        )}
        <FoldIcon />
        <Switch
          size="small"
          checked={canBeEnabled && !!card.enabled}
          color="primary"
          onChange={() => {
            if (!canBeEnabled) return;
            dispatch(
              updateCard({ id: cardId, changes: { enabled: !card.enabled } }),
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

type PanelProps = {
  cardId: string;
  canBeEnabled?: boolean;
  children: [
    React.ReactElement<TopBarTitleType> | string,
    React.ReactElement | string,
  ];
};

export const Panel: React.FC<PanelProps> = ({
  children,
  canBeEnabled = true,
  cardId,
}) => {
  const card = useAppSelector((state) => selectCardById(state, cardId));
  const classes = useStyles({
    disabled: !canBeEnabled || !card?.enabled,
  });
  //if (!card) throw "Fail: missing card";
  if (!card) return null;

  return (
    <div className={classes.root}>
      <TopBar cardId={cardId} canBeEnabled={canBeEnabled}>
        {children[0]}
      </TopBar>
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
