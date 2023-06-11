import { Box, SxProps, Theme, Typography, styled } from "@mui/material";
import * as styles from "./styles";

const FieldTitle = styled(Typography)(styles.fieldTitle);

const FieldValue = styled(Typography)(styles.fieldValue);

export default function DetailsField({
  title,
  value,
  valueSX,
}: {
  title: string;
  value?: string | number;
  valueSX?: SxProps<Theme>;
}) {
  return (
    <Box sx={{ marginTop: 2 }}>
      <FieldTitle variant="body1">{title}</FieldTitle>
      <FieldValue
        variant="body1"
        sx={{
          ...valueSX,
          whiteSpace: "break-spaces",
        }}
      >
        {value}
      </FieldValue>
    </Box>
  );
}
