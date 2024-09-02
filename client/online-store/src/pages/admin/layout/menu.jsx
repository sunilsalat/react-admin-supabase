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
import Books from "../books";
import Nations from "../settings/nations";
import SubMenu from "./subMenu";
import Reviews from "../reviews";

// type MenuName = "pressReleases" | "products";

const Menu = ({ dense = false }) => {
  const [state, setState] = useState({
    items: true,
    products: true,
    pressReleases: true,
    nations: true,
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
        handleToggle={() => handleToggle("items")}
        isOpen={state.items}
        name="Items"
        icon={<Books.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/books"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Books`, {
            smart_count: 2,
          })}
          leftIcon={<Books.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/admin/laptops"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Laptops`, {
            smart_count: 2,
          })}
          leftIcon={<Books.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("products")}
        isOpen={state.products}
        name="Products"
        icon={<Products.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/products"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Products`, {
            smart_count: 2,
          })}
          leftIcon={<Products.icon />}
          dense={dense}
        />
      </SubMenu>
      <MenuItemLink
        to="/admin/press_releases"
        state={{ _scrollToTop: true }}
        primaryText={translate(`Press Releases`, {
          smart_count: 2,
        })}
        leftIcon={<PressReleases.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/admin/reviews"
        state={{ _scrollToTop: true }}
        primaryText={translate(`Reviews`, {
          smart_count: 2,
        })}
        leftIcon={<Reviews.icon />}
        dense={dense}
      />
      <SubMenu
        handleToggle={() => handleToggle("settings")}
        isOpen={state.settings}
        name="Settings"
        icon={<Nations.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/nations"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Nations`, {
            smart_count: 2,
          })}
          leftIcon={<Nations.icon />}
          dense={dense}
        />
      </SubMenu>
    </Box>
  );
};

export default Menu;
