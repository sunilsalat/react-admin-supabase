import {
  Create,
  DateInput,
  Edit,
  ReferenceField,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";
export const bookCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="author" />
      <TextInput source="sold_times" />
      <ReferenceInput
        source="currency_id"
        reference="currencies"
        filterToQuery={(searchText) => ({ name: searchText })}
      />
    </SimpleForm>
  </Create>
);
