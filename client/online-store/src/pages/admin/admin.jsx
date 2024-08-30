import {
  Admin,
  CustomRoutes,
  EditGuesser,
  ListGuesser,
  Resource,
  nanoLightTheme,
  localStorageStore,
  useStore,
} from "react-admin";
import { dataProvider } from "../../utils/dataProvider";
import { authProvider } from "../../utils/authProvider";
import { ForgotPasswordPage, LoginPage, SetPasswordPage } from "ra-supabase";
import { Route } from "react-router-dom";
import { Layout } from "./layout";
import { themes } from "./themes/themes";
import { MyError } from "../../components/myError";
import PressReleases from "./pressReleases";
import Products from "./products";
import Items from "./items";

const store = localStorageStore(undefined, "ECommerce");

function MyAdmin() {
  const [themeName] = useStore("themeName", "soft");
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;
  return (
    <Admin
      basename="/admin"
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
      loginPage={LoginPage}
      error={MyError}
      store={store}
      lightTheme={lightTheme}
      darkTheme={darkTheme}
      defaultTheme="light"
      layout={Layout}
      disableTelemetrys
    >
      <CustomRoutes noLayout>
        <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
        <Route
          path={ForgotPasswordPage.path}
          element={<ForgotPasswordPage />}
        />
      </CustomRoutes>
      <Resource name="press_releases" {...PressReleases} />
      <Resource name="products" {...Products} />
      <Resource name="books" {...Items} />
      <Resource name="laptops" {...Items} />
    </Admin>
  );
}

export default MyAdmin;

const AppWrapper = () => (
  <StoreContextProvider value={store}>
    <App />
  </StoreContextProvider>
);
