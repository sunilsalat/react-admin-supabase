import {
  CreateButton,
  Datagrid,
  DatagridConfigurable,
  DateField,
  ExportButton,
  List,
  NumberInput,
  ReferenceField,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
  useGetResourceLabel,
} from "react-admin";

export const reviewList = () => {
  const getResourceLabel = useGetResourceLabel();
  console.log(getResourceLabel("reviews", 2));

  return (
    <List
      filters={[<SearchInput source="name" alwaysOn />]}
      actions={
        <TopToolbar>
          <SelectColumnsButton />
          <CreateButton />
          <ExportButton />
        </TopToolbar>
      }
    >
      <DatagridConfigurable>
        <TextField source="name" />
        <TextField source="code" />
        <TextField source="continent_codes" />
        <TextField source="region_codes" />
        <TextField source="locale" />
      </DatagridConfigurable>
    </List>
  );
};
