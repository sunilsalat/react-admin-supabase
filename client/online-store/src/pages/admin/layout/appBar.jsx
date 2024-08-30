import * as React from "react";
import { AppBar, TitlePortal } from "react-admin";
import { Box, useMediaQuery } from "@mui/material";

import Logo from "./logo.jsx";
import { AppBarToolbar } from "./appBarToolBar.jsx";

const CustomAppBar = () => {
  const isLargeEnough = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <AppBar color="secondary" toolbar={<AppBarToolbar />}>
      <TitlePortal />
      {isLargeEnough && <Logo />}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar>
  );
};

export default CustomAppBar;
