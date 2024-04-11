import { Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  MarkdownField,
  NumberField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export const PatientShow = () => {
  const { queryResult } = useShow({});

  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"Id"}
        </Typography>
        <NumberField value={record?.patientId ?? ""} />

        <Typography variant="body1" fontWeight="bold">
          {"First Name"}
        </Typography>
        <TextField value={record?.firstName} />

        <Typography variant="body1" fontWeight="bold">
          {"Last Name"}
        </Typography>
        <MarkdownField value={record?.lastName} />
        <Typography variant="body1" fontWeight="bold">
          {"Email"}
        </Typography>
        <TextField value={record?.email} />
        <Typography variant="body1" fontWeight="bold">
          {"Created At"}
        </Typography>
        <DateField value={record?.createdAt} />
        <Typography variant="body1" fontWeight="bold">
          {"Updated At"}
        </Typography>
        <DateField value={record?.updatedAt} />
      </Stack>
    </Show>
  );
};
