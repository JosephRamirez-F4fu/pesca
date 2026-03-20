import { Box, Typography } from "@mui/material";

interface SalesMetricCardProps {
  label: string;
  value: string;
  tone?: "light" | "accent";
}

export const SalesMetricCard = ({
  label,
  value,
  tone = "light",
}: SalesMetricCardProps) => {
  const accent = tone === "accent";

  return (
    <Box
      sx={{
        p: 2.5,
        minHeight: 138,
        borderRadius: "24px",
        border: accent
          ? "1px solid rgba(110,38,30,0.18)"
          : "1px solid rgba(9, 52, 46, 0.1)",
        background: accent
          ? "linear-gradient(180deg, rgba(110,38,30,0.08) 0%, rgba(248,241,231,0.98) 100%)"
          : "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(245,239,229,0.98) 100%)",
        boxShadow: "0 18px 44px rgba(16, 42, 67, 0.08)",
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "text.secondary",
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          mt: 2.5,
          fontFamily: '"Iowan Old Style", "Palatino Linotype", serif',
          fontSize: { xs: "2rem", md: "2.4rem" },
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
          color: accent ? "#6e261e" : "text.primary",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
