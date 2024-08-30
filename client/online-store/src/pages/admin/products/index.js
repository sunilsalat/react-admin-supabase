import { productList } from "./productList";
import { productCreate } from "./productCreate";
import { productEdit } from "./productEdit";
import OrderIcon from "@mui/icons-material/AttachMoney";

export default {
  list: productList,
  edit: productEdit,
  icon: OrderIcon,
  recordRepresentation: "name",
  options: { label: "Products" },
};
