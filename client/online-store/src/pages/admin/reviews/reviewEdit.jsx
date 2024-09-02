import {
  AutocompleteInput,
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SearchInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

const filterToQuery = (searchText) => ({ name: `%${searchText}%` });

export const reviewEdit = () => (
  <Edit mutationMode="pessimistic">
    <SimpleForm warnWhenUnsavedChanges>
      <TextInput source="name" />
      <TextInput source="code" />
      <TextInput source="continent_codes" />
      <TextInput source="region_codes" />
      <TextInput source="locale" />
    </SimpleForm>
  </Edit>
);
