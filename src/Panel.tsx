// Layout components.
import { Grid, Switch } from "@material-ui/core";
// Icons.
import {
  UnfoldLess as UnfoldLessIcon,
  UnfoldMore as UnfoldMoreIcon,
} from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "./app/store";
import { selectCardById, updateCard } from "./features/cards/cardsSlice";

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
  cardId: string;
  children: TopBarTitleType;
}> = ({ cardId, children }) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => selectCardById(state, cardId));
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
    <TopBarRoot container justify="space-between" alignItems="center">
      <Grid container item sm={10} alignItems="center">
        {children}
      </Grid>
      <Grid container item sm={2} justify="flex-end" alignItems="center">
        <FoldIcon />
        <Switch
          size="small"
          checked={card.enabled ?? false}
          color="primary"
          onChange={() =>
            dispatch(updateCard({ id: cardId, enabled: !card.enabled }))
          }
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

type PanelProps = {
  cardId: string;
  children: [
    React.ReactElement<TopBarTitleType> | string,
    React.ReactElement | string,
  ];
};

export const Panel: React.FC<PanelProps> = ({ children, cardId }) => {
  const card = useAppSelector((state) => selectCardById(state, cardId));
  //if (!card) throw "Fail: missing card";
  if (!card) return null;

  return (
    <PanelRootDiv>
      <TopBar cardId={cardId}>{children[0]}</TopBar>
      <AnimatePresence initial={false}>
        {card.visible && (
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
