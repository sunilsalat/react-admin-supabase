import { pressReleasesList } from "./prList";
import { pressReleasesCreate } from "./prCreate";
import { pressReleasesEdit } from "./prEdit";
import OrderIcon from "@mui/icons-material/AttachMoney";

export { pressReleasesList, pressReleasesCreate, pressReleasesEdit };

export default {
  list: pressReleasesList,
  create: pressReleasesCreate,
  edit: pressReleasesEdit,
  icon: OrderIcon,
};
