import { LoginForm } from "../../components/login-form";
import { Box, Grid, Stack, Typography } from "@mui/material";

export const Login = () => {
  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f4efe6 0%, #efe6d5 36%, #09342e 36%, #052521 100%)",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          position: "relative",
          overflow: "hidden",
          px: { xs: 3, sm: 6, md: 8 },
          py: { xs: 6, sm: 8 },
          background:
            "radial-gradient(circle at top left, rgba(9,52,46,0.18), transparent 30%), linear-gradient(180deg, #f8f1e7 0%, #efe4d0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: "auto auto 12% -8%",
            width: 220,
            height: 220,
            borderRadius: "50%",
            border: "1px solid rgba(9, 52, 46, 0.12)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 36,
            right: 24,
            width: 120,
            height: 120,
            borderRadius: "32px",
            background: "rgba(9, 52, 46, 0.05)",
            transform: "rotate(18deg)",
          }}
        />
        <LoginForm />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          position: "relative",
          overflow: "hidden",
          px: { xs: 3, sm: 6, md: 8 },
          py: { xs: 6, sm: 8 },
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.09), transparent 26%), linear-gradient(180deg, #0d3b34 0%, #062824 100%)",
          color: "#f7f0e4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -60,
            right: -40,
            width: 220,
            height: 220,
            borderRadius: "50%",
            border: "1px solid rgba(247, 240, 228, 0.12)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 36,
            left: -34,
            width: 140,
            height: 140,
            borderRadius: "28px",
            border: "1px solid rgba(247, 240, 228, 0.14)",
            transform: "rotate(14deg)",
          }}
        />
        <Stack
          spacing={5}
          sx={{ maxWidth: 560, position: "relative", zIndex: 1 }}
        >
          <Box
            sx={{
              display: "inline-flex",
              p: 1.5,
              borderRadius: "28px",
              bgcolor: "rgba(247,240,228,0.08)",
              border: "1px solid rgba(247,240,228,0.12)",
              width: "fit-content",
            }}
          >
            <Box
              component="img"
              src="logo.jpg"
              alt="Logo de Inversiones Juany'S e.I.R.L."
              sx={{
                width: 86,
                height: 86,
                objectFit: "cover",
                borderRadius: "22px",
              }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                mb: 1.5,
                fontSize: 12,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(247,240,228,0.64)",
              }}
            >
              Plataforma operativa
            </Typography>
            <Typography
              component="h1"
              sx={{
                maxWidth: 520,
                fontFamily: '"Iowan Old Style", "Palatino Linotype", serif',
                fontSize: { xs: "2.8rem", md: "4.4rem" },
                lineHeight: 0.94,
                letterSpacing: "-0.04em",
                mb: 2,
              }}
            >
              Logística, pesca y control en una sola mesa de mando.
            </Typography>
            <Typography
              sx={{
                maxWidth: 470,
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(247,240,228,0.78)",
              }}
            >
              Un acceso claro para coordinar viajes, cajas y operación diaria
              con menos fricción y una lectura visual más precisa.
            </Typography>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};
