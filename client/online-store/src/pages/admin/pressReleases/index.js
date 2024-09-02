import { pressReleasesList } from "./prList";
import { pressReleasesCreate } from "./prCreate";
import { pressReleasesEdit } from "./prEdit";
import Icon from "@mui/icons-material/Newspaper";

export { pressReleasesList, pressReleasesCreate, pressReleasesEdit };

export default {
  list: pressReleasesList,
  create: pressReleasesCreate,
  edit: pressReleasesEdit,
  icon: Icon,
};
