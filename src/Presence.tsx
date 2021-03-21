import React from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
//import "./styles.css";

import styled from "styled-components";

const Ul = styled(motion.ul)`
  width: 300px;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 25px;
`;

const Li = styled(motion.li)`
  background-color: rgba(214, 214, 214, 0.5);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;
`;

const Row = styled.div`
  width: 100%;
  height: 8px;
  background-color: #999;
  border-radius: 10px;
  margin-top: 12px;
`;

export default function App(): JSX.Element {
  return (
    <AnimateSharedLayout>
      <Ul layout initial={{ borderRadius: 25 }}>
        {items.map((item) => (
          <Item key={item} />
        ))}
      </Ul>
    </AnimateSharedLayout>
  );
}

function Item() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
      <motion.div className="avatar" layout />
      <AnimatePresence>{isOpen && <Content />}</AnimatePresence>
    </Li>
  );
}

function Content() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Row>Hello</Row>
      <Row>Foo</Row>
      <Row>Bar</Row>
    </motion.div>
  );
}

const items = [0, 1, 2];
