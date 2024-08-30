import * as React from "react";
import { AppBar, TitlePortal } from "react-admin";
import { Box, useMediaQuery } from "@mui/material";

import Logo from "./logo.jsx";
// import { AppBarToolbar } from "./appBarToolbar.jsx";

const CustomAppBar = () => {
  const isLargeEnough = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    // <AppBar color="secondary" toolbar={<AppBarToolbar />}>
    <AppBar color="secondary">
      <TitlePortal />
      {isLargeEnough && <Logo />}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar>
  );
};

export default CustomAppBar;
