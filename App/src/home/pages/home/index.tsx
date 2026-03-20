import { navbarItems } from "../../../shared/navbarItems/types/Item";
import { Button } from "../../components/button";
import { Box } from "@mui/system";
import { useAuth } from "./../../../auth/context/useContext";
import { Button as MuiButton, Container, Stack, Typography } from "@mui/material";
import { APP_ROUTES } from "../../../core/router/paths";

export const Home = () => {
  const { logout, userSession } = useAuth();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: 10,
        background:
          "linear-gradient(180deg, #f7f2e9 0%, #efe6d7 45%, #e8eef2 100%)",
      }}
    >
      <Box
        sx={{
          px: 3,
          pt: { xs: 6, md: 7 },
          pb: { xs: 12, md: 14 },
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 24%), linear-gradient(135deg, #0c4038 0%, #082b26 100%)",
          color: "#f8f1e7",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "flex-end" }}
          >
            <Stack spacing={2} sx={{ maxWidth: 760 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(248,241,231,0.66)",
                }}
              >
                Inicio operativo
              </Typography>
              <Typography
                component="h1"
                sx={{
                  fontFamily: '"Iowan Old Style", "Palatino Linotype", serif',
                  fontSize: { xs: "3.1rem", md: "5rem" },
                  lineHeight: 0.94,
                  letterSpacing: "-0.05em",
                  maxWidth: 700,
                }}
              >
                Un punto de control claro para la operación diaria.
              </Typography>
              <Typography
                sx={{
                  color: "rgba(248,241,231,0.76)",
                  maxWidth: 420,
                  lineHeight: 1.6,
                }}
              >
                Elige un módulo y continúa.
              </Typography>
            </Stack>
            <Stack
              spacing={1.25}
              sx={{
                minWidth: { md: 260 },
                p: 3,
                borderRadius: "28px",
                bgcolor: "rgba(248,241,231,0.06)",
                border: "1px solid rgba(248,241,231,0.12)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(248,241,231,0.6)",
                }}
              >
                Sesión activa
              </Typography>
              <Typography variant="h6">{userSession?.name ?? "Usuario"}</Typography>
              <Typography sx={{ color: "rgba(248,241,231,0.74)" }}>
                Rol: {userSession?.role ?? "Sin rol"}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Box
        sx={{
          mt: { xs: -6, md: -8 },
          p: { xs: 2, md: 0 },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {navbarItems.map((item) => (
          <Button
            key={item.url}
            to={item.url}
            state={{ from: APP_ROUTES.home }}
            title={item.title}
          />
        ))}
        <Box
          sx={{
            p: 3,
            borderRadius: "24px",
            border: "1px solid rgba(9, 52, 46, 0.12)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(245,239,229,0.9) 100%)",
            boxShadow: "0 18px 44px rgba(16, 42, 67, 0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 176,
          }}
        >
          <Stack spacing={1.5}>
            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            >
              Sesión
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Iowan Old Style", "Palatino Linotype", serif',
                fontSize: { xs: "2rem", md: "2.3rem" },
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
              }}
            >
              Salir
            </Typography>
            <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
              Cierra la sesión actual.
            </Typography>
          </Stack>
          <MuiButton
            onClick={logout}
            variant="outlined"
            sx={{
              alignSelf: "flex-start",
              mt: 3,
              borderRadius: "999px",
              px: 2.5,
            }}
          >
            Cerrar sesión
          </MuiButton>
        </Box>
        </Box>
      </Container>
    </Box>
  );
};
