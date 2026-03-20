import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface ActionLink {
  label: string;
  to: string;
}

interface SalesPageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ActionLink[];
  children: ReactNode;
}

export const SalesPageShell = ({
  eyebrow,
  title,
  description,
  actions,
  children,
}: SalesPageShellProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: 8,
        background:
          "linear-gradient(180deg, #f4ead7 0%, #f7f3ec 48%, #ebf0ee 100%)",
      }}
    >
      <Box
        sx={{
          px: 3,
          pt: { xs: 4, md: 5 },
          pb: { xs: 8, md: 10 },
          color: "#f8f1e7",
          background:
            "radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 24%), linear-gradient(135deg, #6e261e 0%, #4e1611 56%, #2f0d09 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2.5}>
            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(248,241,231,0.68)",
              }}
            >
              {eyebrow}
            </Typography>
            <Typography
              component="h1"
              sx={{
                fontFamily: '"Iowan Old Style", "Palatino Linotype", serif',
                fontSize: { xs: "2.8rem", md: "4.2rem" },
                lineHeight: 0.92,
                letterSpacing: "-0.05em",
                maxWidth: 760,
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                maxWidth: 680,
                color: "rgba(248,241,231,0.78)",
                lineHeight: 1.65,
              }}
            >
              {description}
            </Typography>
            {actions && actions.length > 0 ? (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                {actions.map((action) => (
                  <Button
                    key={action.to}
                    component={RouterLink}
                    to={action.to}
                    variant="contained"
                    sx={{
                      alignSelf: "flex-start",
                      borderRadius: "999px",
                      px: 2.5,
                      bgcolor: "rgba(248,241,231,0.14)",
                      color: "#f8f1e7",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        bgcolor: "rgba(248,241,231,0.22)",
                      },
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Stack>
            ) : null}
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Box sx={{ mt: { xs: -4, md: -6 } }}>{children}</Box>
      </Container>
    </Box>
  );
};
