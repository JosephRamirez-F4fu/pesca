import { CircularProgress, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export interface FullscreenStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
}

export const FullscreenState = ({
  title,
  description,
  action,
  icon,
  loading = false,
}: FullscreenStateProps) => {
  return (
    <Stack
      spacing={3}
      sx={{
        minHeight: "100vh",
        px: 3,
        py: 6,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background:
          "radial-gradient(circle at top, rgba(10,122,110,0.18), transparent 32%), linear-gradient(180deg, #f6fbfa 0%, #eef3f7 100%)",
      }}
    >
      <Stack
        spacing={2}
        sx={{
          maxWidth: 520,
          width: "100%",
          p: { xs: 4, sm: 5 },
          borderRadius: 6,
          bgcolor: "rgba(255,255,255,0.86)",
          border: "1px solid rgba(15, 23, 42, 0.08)",
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.12)",
          backdropFilter: "blur(18px)",
          alignItems: "center",
        }}
      >
        {loading ? (
          <CircularProgress size={34} thickness={4.5} />
        ) : (
          icon ?? (
            <Typography variant="h2" component="span">
              ...
            </Typography>
          )
        )}
        <Stack spacing={1} alignItems="center">
          <Typography variant="h4">{title}</Typography>
          {description && (
            <Typography color="text.secondary">{description}</Typography>
          )}
        </Stack>
        {action}
      </Stack>
    </Stack>
  );
};
