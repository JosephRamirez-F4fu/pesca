export interface ButtonProps {
  title: string;
  to: string;
  state?: {
    from?: string;
  };
}

import { Box, Button as MaterialButton, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const Button = ({ title, to, state }: ButtonProps) => {
  return (
    <MaterialButton
      variant="text"
      component={RouterLink}
      to={to}
      state={state}
      sx={{
        width: "100%",
        minHeight: 176,
        p: 3,
        alignItems: "flex-start",
        justifyContent: "flex-end",
        textAlign: "left",
        borderRadius: "24px",
        border: "1px solid rgba(9, 52, 46, 0.1)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(245,239,229,0.96) 100%)",
        color: "text.primary",
        boxShadow: "0 18px 44px rgba(16, 42, 67, 0.08)",
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(9, 52, 46, 0.22)",
          boxShadow: "0 24px 54px rgba(16, 42, 67, 0.12)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(245,239,229,1) 100%)",
        },
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            fontFamily: '"Iowan Old Style", "Palatino Linotype", serif',
            fontSize: { xs: "2rem", md: "2.3rem" },
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            mb: 3,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "primary.dark",
            opacity: 0.72,
          }}
        >
          Ingresar
        </Typography>
      </Box>
    </MaterialButton>
  );
};
