import { createBrowserRouter, Route } from "react-router-dom";
import ListingPage from "../pages/listingPage";
import DetailPage from "../pages/detailPage";
import ContactUs from "../pages/contactUs";
import MainLayout from "../pages/mianLayout";
import AuthWrapper from "./authWrapper";
import Login from "../pages/login";
import SignUp from "../pages/signUp";
import MyAdmin from "../pages/admin/admin";

const routeData = [
  {
    path: "/admin/*",
    element: <MyAdmin />,
    children: [],
    Header: "Contact us Page",
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  //   children: [],
  //   Header: "Listing Page",
  // },
  // {
  //   path: "/sign-up",
  //   element: <SignUp />,
  //   children: [],
  //   Header: "Listing Page",
  // },
  // {
  //   path: "/",
  //   element: (
  //     <AuthWrapper>
  //       <MainLayout />
  //     </AuthWrapper>
  //   ),
  //   children: [
  //     {
  //       path: "/",
  //       element: <ListingPage />,
  //       children: [],
  //       Header: "Listing Page",
  //     },
  //     {
  //       path: "/detail/:id",
  //       element: <DetailPage />,
  //       children: [],
  //       Header: "Detail Page",
  //     },
  //     {
  //       path: "/contact-us",
  //       element: <ContactUs />,
  //       children: [],
  //       Header: "Contact us Page",
  //     },
  //     {
  //       path: "/admin/*",
  //       element: <MyAdmin />,
  //       children: [],
  //       Header: "Contact us Page",
  //     },
  //     {
  //       path: "*",
  //       element: <h1>Not found</h1>,
  //       children: [],
  //       Header: "Not found page",
  //     },
  //   ],
  // },
];

export const routing = createBrowserRouter(routeData);
