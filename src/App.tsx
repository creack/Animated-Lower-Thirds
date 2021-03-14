import React, { ReactElement, useEffect, useRef } from "react";
// import "./App.css";
import Card from "./Card";

const bcp = new BroadcastChannel("obs-lower-thirds-channel"); // Receives from the source
const bcr = new BroadcastChannel("obs-lower-thirds-channel2"); // Send to Control Panel
const bcf = new BroadcastChannel("obs-lower-thirds-fonts");

/* const sendToControlPanel = (bcr: BroadcastChannel, c1: number, d1: number) => {
 *   let activeTime = c1 - 1;
 *   let inactiveTime = d1 - 1;
 *
 *   if (activeTime1_to_send < 0) {
 *     activeTime1_to_send = 0;
 *   }
 *   if (inactiveTime1_to_send < 0) {
 *     inactiveTime1_to_send = 0;
 *   }
 *
 *   bcr.postMessage({ activeTime1_to_send, inactiveTime1_to_send });
 * };
 *  */
const refreshData = (bcr: BroadcastChannel, c1: number, d1: number) => {
  // TODO: Check for preview mode.
  // sendToControlPanel(bcr, c1, d1);
};

type lowerThirdState = {
  enabled: boolean;

  title: string;
  text: string;

  animationTime: number;
  size: number;
  horizalMargin: number;
  vericalMargin: number;
  lineSpacing: number;
  nameSize: number;
  infoSize: number;
  nameTransform: string;
  infoTransform: string;
  nameWeight: number;
  infoWeight: number;
  nameColor: string;
  infoColor: string;
  styleColor1: string;
  styleColor2: string;
  styleColor3: string;
  styleColor4: string;
  font: string;
  logoSize: number;
  corners: number;
  borderSwitch: boolean;
  borderThicknessAmount: number;

  textAlign: "left" | "center" | "right";

  features: {
    logo: boolean;
    background: boolean;
    shadows: boolean;
  };

  logoPath: string;
};

const App: React.FC = (): ReactElement => {
  useEffect(() => {
    console.log("Sending resend request to controller.");
    bcr.postMessage({ resend: true });

    bcf.onmessage = ({ data }) => {
      const style = document.createElement("style");
      style.innerHTML = data?.new_font_to_send;
      document.head.appendChild(style);
      console.log("Got a new font.", data?.new_font_to_send);
    };

    setTimeout(refreshData, 1000);
  }, []);

  bcp.onmessage = (e) => {
    console.log(e.data);
  };
  return (
    <div className="App">
      <Card
        title="Hell2o"
        text="world"
        align="right"
        titleStyle={{
          fontFamily: "Fira Code, monospace",
          fontSize: "1.6em",
          color: "#F2F2F2",
        }}
        textStyle={{
          fontFamily: "Fira Code, monospace",
          fontSize: "1.4em",
          color: "#8A8A8A",
        }}
      />
    </div>
  );
};

export default App;
