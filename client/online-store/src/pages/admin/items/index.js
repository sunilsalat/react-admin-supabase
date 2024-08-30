import ProductIcon from "@mui/icons-material/Collections";
import { itemList } from "./itemList";
import { itemEdit } from "./itemEdit";
import { itemCreate } from "./itemCreate";

export default {
  list: itemList,
  edit: itemEdit,
  create: itemCreate,
  icon: ProductIcon,
  recordRepresentation: "name",
  options: { label: "Items" },
};
