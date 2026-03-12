import { alpha, Box, Button, Card, Stack, SxProps, Theme, Typography } from "@mui/material";
import { ComponentProps, ReactNode } from "react";

export const sectionCardSx: SxProps<Theme> = {
  p: { xs: 2, md: 2.75 },
  borderRadius: 4,
  border: "1px solid",
  borderColor: alpha("#0f3d3e", 0.08),
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(252,249,243,0.98) 100%)",
  boxShadow: "0 18px 45px rgba(15, 61, 62, 0.07)",
};

export const tableWrapSx: SxProps<Theme> = {
  mt: 2,
  overflowX: "auto",
  borderRadius: 3,
  border: "1px solid",
  borderColor: alpha("#0f3d3e", 0.08),
  backgroundColor: alpha("#ffffff", 0.86),
  "& .MuiTable-root": {
    minWidth: 640,
  },
  "& .MuiTableCell-head": {
    color: "#567170",
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    borderBottomColor: alpha("#0f3d3e", 0.08),
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  "& .MuiTableCell-body": {
    borderBottomColor: alpha("#0f3d3e", 0.08),
    color: "#16324f",
  },
  "& .MuiTableRow-root:last-of-type .MuiTableCell-body": {
    borderBottom: "none",
  },
};

export const fieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: alpha("#f7f2e9", 0.56),
  },
};

export const primaryButtonSx: SxProps<Theme> = {
  borderRadius: 999,
  px: 2.2,
  py: 1,
  textTransform: "none",
  fontWeight: 700,
  backgroundColor: "#0f7c78",
  color: "#f7f4ed",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#0b6a66",
    boxShadow: "none",
  },
};

export const secondaryButtonSx: SxProps<Theme> = {
  borderRadius: 999,
  px: 1.75,
  py: 0.85,
  minWidth: 0,
  textTransform: "none",
  fontWeight: 700,
  color: "#0f3d3e",
  backgroundColor: alpha("#0f7c78", 0.1),
  boxShadow: "none",
  "&:hover": {
    backgroundColor: alpha("#0f7c78", 0.16),
    boxShadow: "none",
  },
};

export const dangerButtonSx: SxProps<Theme> = {
  ...secondaryButtonSx,
  color: "#8f4c34",
  backgroundColor: alpha("#c9825a", 0.12),
  "&:hover": {
    backgroundColor: alpha("#c9825a", 0.18),
  },
};

export const SectionSurface = ({
  eyebrow,
  title,
  subtitle,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}) => (
  <Card sx={sectionCardSx}>
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", md: "center" }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#0f7c78",
            mb: 0.8,
          }}
        >
          {eyebrow}
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: "#16324f", fontWeight: 800, lineHeight: 1.05 }}
        >
          {title}
        </Typography>
        <Typography sx={{ mt: 1, color: "#4f6a7a", maxWidth: 620 }}>
          {subtitle}
        </Typography>
      </Box>
      {action}
    </Stack>
    {children}
  </Card>
);

export const SummaryPill = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <Box
    sx={{
      px: 1.6,
      py: 1.2,
      borderRadius: 999,
      minWidth: { xs: "100%", sm: 150 },
      backgroundColor: alpha("#0f7c78", 0.09),
      border: "1px solid",
      borderColor: alpha("#0f7c78", 0.08),
    }}
  >
    <Typography
      sx={{
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#567170",
      }}
    >
      {label}
    </Typography>
    <Typography sx={{ mt: 0.6, color: "#16324f", fontWeight: 800 }}>
      {value}
    </Typography>
  </Box>
);

export const ActionButton = (props: ComponentProps<typeof Button>) => (
  <Button variant="contained" {...props} sx={{ ...secondaryButtonSx, ...props.sx }} />
);

export const DangerButton = (props: ComponentProps<typeof Button>) => (
  <Button variant="contained" color="error" {...props} sx={{ ...dangerButtonSx, ...props.sx }} />
);
