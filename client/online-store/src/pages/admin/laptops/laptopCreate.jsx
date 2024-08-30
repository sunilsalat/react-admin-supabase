import {
  Create,
  DateInput,
  Edit,
  ReferenceField,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";
export const laptopCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="ram" />
      <TextInput source="cpu" />
      <ReferenceInput source="currency_id" reference="currencies" />
    </SimpleForm>
  </Create>
);
