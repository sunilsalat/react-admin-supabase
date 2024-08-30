import {
  Admin,
  CustomRoutes,
  EditGuesser,
  ListGuesser,
  Resource,
  nanoLightTheme,
} from "react-admin";
import { dataProvider } from "../../utils/dataProvider";
import { authProvider } from "../../utils/authProvider";
import { ForgotPasswordPage, LoginPage, SetPasswordPage } from "ra-supabase";
import { Route } from "react-router-dom";
import { userCreate, userEdit, userList } from "./users";
import {
  pressReleasesList,
  pressReleasesCreate,
  pressReleasesEdit,
} from "./pressReleases";
import { MyError } from "../../components/myError";
import { productCreate, productEdit, productList } from "./products";

function MyAdmin() {
  return (
    <Admin
      basename="/admin"
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
      loginPage={LoginPage}
      error={MyError}
      theme={nanoLightTheme}
      // layout={}
      disableTelemetrys
    >
      <CustomRoutes noLayout>
        <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
        <Route
          path={ForgotPasswordPage.path}
          element={<ForgotPasswordPage />}
        />
      </CustomRoutes>
      <Resource
        name="press_releases"
        options={{ label: "Press Releases" }}
        list={pressReleasesList}
        create={pressReleasesCreate}
        edit={pressReleasesEdit}
      />
      <Resource
        name="profile"
        options={{ label: "Users" }}
        list={userList}
        edit={userEdit}
        create={userCreate}
      />
      <Resource
        name="products"
        options={{ label: "Products" }}
        list={productList}
        edit={productEdit}
        create={productCreate}
        recordRepresentation="name"
      />
    </Admin>
  );
}

export default MyAdmin;
