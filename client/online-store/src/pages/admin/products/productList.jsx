import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const productList = () => (
  <List>
    <Datagrid>
      <TextField source="unique_id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="type" />
      <NumberField source="price" />
      <NumberField source="sale_price" />
      <NumberField source="discount" />
      <ReferenceField source="currency_id" reference="currencies" />
    </Datagrid>
  </List>
);
