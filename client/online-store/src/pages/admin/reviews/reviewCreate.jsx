import {
  BooleanInput,
  Create,
  DateInput,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";
export const reviewCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <SelectInput
        source="entity_type"
        choices={[
          { id: "tech", name: "products" },
          { id: "lifestyle", name: "spa" },
          { id: "people", name: "restaurant" },
          { id: "people", name: "hotel" },
        ]}
      />
      <ReferenceInput source="entity_id" />
      <ReferenceInput source="profile_id" reference="profiles" />
      <TextInput source="reviewer_name" />
      <TextInput source="reviewer_email" />
      <TextInput source="reviewer_note" />
      <NumberInput source="overall_rating" />
      <BooleanInput source="verified" />
      <TextInput source="verification_code" />
      <TextInput source="unique_id" />
      <DateInput source="created_at" />
    </SimpleForm>
  </Create>
);
