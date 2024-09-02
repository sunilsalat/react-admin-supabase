import Icon from "@mui/icons-material/Reviews";
import { reviewList } from "./reviewList";
import { reviewEdit } from "./reviewEdit";
import { reviewCreate } from "./reviewCreate";
import { EditGuesser, ListGuesser } from "react-admin";

export default {
  list: reviewList,
  edit: reviewEdit,
  create: reviewCreate,
  icon: Icon,
  recordRepresentation: "name",
  options: { label: "Reviews" },
};
