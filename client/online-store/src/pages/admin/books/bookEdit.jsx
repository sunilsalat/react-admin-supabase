import {
  AutocompleteInput,
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SearchInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const filterToQuery = (searchText) => ({ name: `%${searchText}%` });

export const bookEdit = () => (
  <Edit mutationMode="pessimistic">
    <SimpleForm warnWhenUnsavedChanges>
      <TextInput source="name" />
      <NumberInput source="price" />
      <TextInput source="author" />
      <ReferenceInput source="currency_id" reference="currencies">
        <AutocompleteInput filterToQuery={filterToQuery} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
