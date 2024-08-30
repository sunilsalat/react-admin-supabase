import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  TextField,
} from "react-admin";

export const pressReleasesList = () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="date" />
      <TextField source="slug" />
      <TextField source="unique_id" />
    </Datagrid>
  </List>
);
