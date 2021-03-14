import React, { ReactElement, useEffect } from "react";
// import "./App.css";
import Card from "./Card";
//import { shuffle } from "./utils";

/* const bcp = new BroadcastChannel("obs-lower-thirds-channel"); // Receives from the source
 * const bcr = new BroadcastChannel("obs-lower-thirds-channel2"); // Send to Control Panel
 * const bcf = new BroadcastChannel("obs-lower-thirds-fonts");
 *  */
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
/* const refreshData = (bcr: BroadcastChannel, c1: number, d1: number) => {
 *   // TODO: Check for preview mode.
 *   // sendToControlPanel(bcr, c1, d1);
 * };
 *  */

/* const __custom_data = {
 *   global_animation_time: 4,
 *   global_active_time: 25,
 *   global_inactive_time: 420,
 *   global_oneshot: false,
 *
 *   alt_2_switch: "false",
 *   alt_3_switch: "false",
 *   alt_4_switch: "false",
 *   alt_2_style_color_2: "",
 *   alt_3_style_color_2: "",
 *   alt_4_style_color_2: "",
 *
 *   alt_1_switch: "true",
 *   alt_1_style: "1",
 *   alt_1_name: "",
 *   alt_1_info: "",
 *   alt_1_name_size: 1.4,
 *   alt_1_info_size: 1.6,
 *   alt_1_name_transform: "normal",
 *   alt_1_info_transform: "normal",
 *   alt_1_name_weight: "bold",
 *   alt_1_info_weight: "lighter",
 *   alt_1_name_color: "#F2F2F2",
 *   alt_1_info_color: "#8A8A8A",
 *   alt_1_style_color_1: "#47D7AC",
 *   alt_1_style_color_2: "rgba(55,85,112,0.46)",
 *   alt_1_logo_switch: "true",
 *   alt_1_background_switch: "true",
 *   alt_1_shadows: "true",
 *   alt_1_align: "right",
 *   alt_1_size: "14",
 *   alt_1_margin_h: "2",
 *   alt_1_margin_v: "6",
 *   alt_1_line_spacing: "0",
 *   alt_1_font: "'Fira Code', monospace",
 *   alt_1_animation_time: "",
 *   alt_1_active_time: "",
 *   alt_1_inactive_time: "",
 *   alt_1_logo_image: "../logos/virtual-surgery-platform.gif",
 *   alt_1_oneshot: true,
 *   alt_1_logo_size: 8,
 *   alt_1_shadow_amount: 0.5,
 *   alt_1_corners: 1.25,
 *   alt_1_border_switch: "false",
 *   alt_1_border_thickness_amount: "4",
 *   alt_1_style_color_3: "#D54141",
 *   alt_1_style_color_4: "#222222",
 * };
 *  */
/* const customLowerThird = (data: typeof __custom_data) => {
 *   const logos = ["medoptic-marketing-img-2.gif", "medoptic-marketing-img-3.gif", "medoptic-marketing-img-4.gif"];
 *
 *   const cards = [
 *     {
 *       title: "Quick Tip: Check out the config files on Github!",
 *       text: "https://github.com/creack/dotfiles",
 *     },
 *     {
 *       title: "Quick Tip: Try your idea in the playground, and share them!",
 *       text: "https://goplay.space",
 *     },
 *   ].map((elem, idx) => ({ ...elem, logo: idx % logos.length }));
 *
 *   const _ms = 1;
 *   const _sec = 1000 * _ms;
 *   const _min = 60 * _sec;
 *   const _hour = 60 * _min;
 *
 *   const initialDelay = 1 * _sec;
 *   const stepDelay = 5 * _sec;
 *   const cycleCompleteDelay = 30 * _sec;
 *
 *   const activeTime = 5 * _sec;
 *   const animationTime = 4 * _sec;
 *
 *   const bc = new BroadcastChannel("obs-lower-thirds-channel");
 *   let randCards = shuffle(cards);
 *   const c = () => {
 *     if (randCards.length === 0) {
 *       randCards = shuffle(cards);
 *       setTimeout(c, cycleCompleteDelay);
 *       return;
 *     }
 *     const card = randCards.pop();
 *
 *     const _data = {
 *       ...data,
 *       alt_1_switch: "true",
 *       alt_1_logo_image: `logos/${logos[card.logo]}`,
 *       alt_1_name: card.title,
 *       alt_1_info: card.text,
 *       alt_1_active_time: activeTime / _sec,
 *       alt_1_animation_time: animationTime / _sec,
 *     };
 *
 *     setTimeout(() => {
 *       bc.postMessage({ ..._data, alt_1_switch: "false" });
 *       setTimeout(c, stepDelay);
 *     }, animationTime + activeTime);
 *
 *     bc.postMessage(_data);
 *   };
 *   console.log("inital", initialDelay);
 *   setTimeout(c, initialDelay);
 * };
 *  */
const App: React.FC = (): ReactElement => {
  useEffect(() => {
    //customLowerThird({ ...__custom_data });
    /* console.log("Sending resend request to controller.");
     * bcr.postMessage({ resend: true });

     * bcf.onmessage = ({ data }) => {
     *   const style = document.createElement("style");
     *   style.innerHTML = data?.new_font_to_send;
     *   document.head.appendChild(style);
     *   console.log("Got a new font.", data?.new_font_to_send);
     * };

     * setTimeout(refreshData, 1000); */
  }, []);

  /* bcp.onmessage = (e) => {
   *   console.log(e.data);
   * }; */
  return (
    <div className="App">
      <Card
        title="Hell2o"
        text="world"
        align="right"
        anim={{
          animType: "style-1",
          animDurationMs: 4000,
          activeDurationMs: 5000,
        }}
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
