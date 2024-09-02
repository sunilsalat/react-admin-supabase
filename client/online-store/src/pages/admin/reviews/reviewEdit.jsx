import {
  BooleanInput,
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";

const filterToQuery = (searchText) => ({ name: `%${searchText}%` });
export const reviewEdit = (props) => {
  const record = useRecordContext();
  console.log({ record });
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="entity_type" />
        <ReferenceInput source="entity_id" />
        <ReferenceInput source="profile_id" reference="record.entity_type" />
        <TextInput source="reviewer_name" />
        <TextInput source="reviewer_email" />
        <TextInput source="reviewer_note" />
        <NumberInput source="overall_rating" />
        <BooleanInput source="verified" />
        <TextInput source="verification_code" />
        <TextInput source="unique_id" />
        <DateInput source="created_at" />
      </SimpleForm>
    </Edit>
  );
};
