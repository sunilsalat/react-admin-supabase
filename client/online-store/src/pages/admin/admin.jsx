import {
  Admin,
  CustomRoutes,
  EditGuesser,
  ListGuesser,
  Resource,
  nanoLightTheme,
  localStorageStore,
} from "react-admin";
import { dataProvider } from "../../utils/dataProvider";
import { authProvider } from "../../utils/authProvider";
import { ForgotPasswordPage, LoginPage, SetPasswordPage } from "ra-supabase";
import { Route } from "react-router-dom";
import { Layout } from "./layout";
import { MyError } from "../../components/myError";
import PressReleases from "./pressReleases";
import Products from "./products";

const store = localStorageStore(undefined, "ECommerce");

function MyAdmin() {
  return (
    <Admin
      basename="/admin"
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
      loginPage={LoginPage}
      error={MyError}
      // theme={nanoLightTheme}
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
    </Admin>
  );
}

export default MyAdmin;
