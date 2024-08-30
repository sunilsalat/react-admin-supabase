import {
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const productEdit = () => (
  <Edit>
    <SimpleForm warnWhenUnsavedChanges>
      <TextInput source="unique_id" disabled />
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="type" />
      <NumberInput source="price" />
      <NumberInput source="sale_price" />
      <NumberInput source="discount" />
      <ReferenceInput source="currency_id" reference="currencies" disabled />
    </SimpleForm>
  </Edit>
);
