import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useList } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
import { IPatient } from "../../interfaces/IPatient";

export const PatientList = () => {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const {
    data: categoryData,
    isLoading,
    isRefetching,
  } = useList<IPatient>({
    resource: "patients",
    pagination: {
      mode: "off",
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "patientId",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "firstName",
        flex: 1,
        headerName: "First Name",
        minWidth: 200,
      },
      {
        field: "lastName",
        flex: 1,
        headerName: "Last Name",
        minWidth: 250,
        renderCell: function render({ value }) {
          if (!value) return "-";
          return <MarkdownField value={value?.slice(0, 80) + "..." || ""} />;
        },
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
        minWidth: 200,
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created at",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "updatedAt",
        flex: 1,
        headerName: "Updated at",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.patientId} />
              <ShowButton hideText recordItemId={row.patientId} />
              <DeleteButton hideText recordItemId={row.patientId} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [categoryData]
  );

  return (
    <List>
      {(isLoading || isRefetching) && <div>Loading...</div>}
      {!isLoading && !isRefetching && (
        <DataGrid
          {...dataGridProps}
          columns={columns}
          getRowId={(row) => row.patientId}
          autoHeight
        />
      )}
    </List>
  );
};
