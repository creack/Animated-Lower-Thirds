import React from "react";
import * as MuiIcons from "@material-ui/icons";
import type { SvgIconComponent } from "@material-ui/icons";

const icons: Record<string, SvgIconComponent> = {
  Filter1: MuiIcons.Filter1,
  Filter2: MuiIcons.Filter2,
  Filter3: MuiIcons.Filter3,
  Filter4: MuiIcons.Filter4,
  Filter5: MuiIcons.Filter5,
  Filter6: MuiIcons.Filter6,
  Filter7: MuiIcons.Filter7,
  Filter8: MuiIcons.Filter8,
  Filter9: MuiIcons.Filter9,
  Settings: MuiIcons.Settings,
};

const Icons: React.FC<{ name?: string }> = ({ name, ...props }) => {
  const Ico = icons[name ?? ""] ?? icons.Settings;
  return <Ico />;
};

export default Icons;
