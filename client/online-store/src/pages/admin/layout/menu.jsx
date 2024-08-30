import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";

import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  useSidebarState,
} from "react-admin";

import Products from "../products";
import PressReleases from "../pressReleases";
import SubMenu from "./subMenu";

// type MenuName = "pressReleases" | "products" | "menuCustomers";

const Menu = ({ dense = false }) => {
  const [state, setState] = useState({
    pressReleases: true,
    products: true,
  });
  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem />
      <SubMenu
        handleToggle={() => handleToggle("products")}
        isOpen={state.products}
        name="Properties"
        icon={<PressReleases.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/press_releases"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Spa`, {
            smart_count: 2,
          })}
          leftIcon={<PressReleases.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/admin/press_releases"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Hotels`, {
            smart_count: 2,
          })}
          leftIcon={<PressReleases.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("pressReleases")}
        isOpen={state.pressReleases}
        name="Products"
        icon={<Products.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/products"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Products One`, {
            smart_count: 2,
          })}
          leftIcon={<Products.icon />}
          dense={dense}
        />
      </SubMenu>
      <MenuItemLink
        to="/admin/products"
        state={{ _scrollToTop: true }}
        primaryText={translate(`Products`, {
          smart_count: 2,
        })}
        leftIcon={<Products.icon />}
        dense={dense}
      />
    </Box>
  );
};

export default Menu;
