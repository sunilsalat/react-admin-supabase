import {
  Create,
  DateInput,
  Edit,
  ReferenceField,
  ReferenceInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
export const reviewCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="code" />
      <TextInput source="continent_codes" />
      <TextInput source="region_codes" />
      <TextInput source="locale" />
    </SimpleForm>
  </Create>
);
