import { useMemo } from "react";
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/context";
import { APP_ROUTES } from "../../../core/router/paths";

export interface NavbarProps {
  items?: null;
}

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, userSession } = useAuth();
  const previousPath = useMemo(() => getPreviousPath(location.state), [location.state]);

  const currentSection = useMemo(
    () => getCurrentSection(location.pathname),
    [location.pathname]
  );
  const backTarget = useMemo(
    () => getBackTarget(location.pathname),
    [location.pathname]
  );
  const backHref = useMemo(() => {
    if (previousPath && previousPath !== location.pathname) {
      return previousPath;
    }

    return backTarget;
  }, [backTarget, location.pathname, previousPath]);

  const handleBack = () => {
    if (backHref) {
      navigate(backHref);
      return;
    }

    if (window.history.length <= 1) {
      navigate(APP_ROUTES.home);
      return;
    }

    navigate(-1);
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        background: "transparent",
        boxShadow: "none",
        pt: 1.5,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            minHeight: 88,
            px: { xs: 2, md: 3 },
            py: 1.5,
            borderRadius: "28px",
            bgcolor: "rgba(248, 241, 231, 0.8)",
            border: "1px solid rgba(9, 52, 46, 0.12)",
            boxShadow: "0 18px 44px rgba(16, 42, 67, 0.08)",
            backdropFilter: "blur(18px)",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              component="img"
              src="/logo.jpg"
              alt="Logo de Inversiones Juany'S e.I.R.L."
              sx={{
                width: 52,
                height: 52,
                objectFit: "cover",
                borderRadius: "16px",
                border: "1px solid rgba(9, 52, 46, 0.12)",
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "text.secondary",
                }}
              >
                {currentSection}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Iowan Old Style", "Palatino Linotype", serif',
                  fontSize: { xs: "1.5rem", md: "1.8rem" },
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                }}
              >
                Inversiones Juany'S e.I.R.L.
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.25}
            alignItems={{ xs: "stretch", sm: "center" }}
            useFlexGap
          >
            <Box
              sx={{
                px: 2,
                py: 1.1,
                borderRadius: "999px",
                bgcolor: "rgba(9, 52, 46, 0.06)",
                border: "1px solid rgba(9, 52, 46, 0.08)",
              }}
            >
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                {userSession?.name ?? "Usuario"} · {userSession?.role ?? "Sin rol"}
              </Typography>
            </Box>
            {location.pathname !== APP_ROUTES.home &&
              (backHref ? (
                <Button
                  component={RouterLink}
                  to={backHref}
                  type="button"
                  variant="text"
                  sx={navButtonSx}
                >
                  Regresar
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="text"
                  sx={navButtonSx}
                >
                  Regresar
                </Button>
              ))}
            <Button
              component={RouterLink}
              to={APP_ROUTES.home}
              type="button"
              variant="text"
              sx={navButtonSx}
            >
              Inicio
            </Button>
            <Button onClick={logout} variant="outlined" sx={logoutButtonSx}>
              Cerrar sesión
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

type NavigationState =
  | {
      from?: string | { pathname?: string | null } | null;
    }
  | null
  | undefined;

const navButtonSx = {
  borderRadius: "999px",
  px: 2.25,
  minHeight: 42,
  color: "text.primary",
};

const logoutButtonSx = {
  borderRadius: "999px",
  px: 2.25,
  minHeight: 42,
  borderColor: "rgba(9, 52, 46, 0.16)",
  color: "text.primary",
};

const getCurrentSection = (pathname: string) => {
  if (pathname.startsWith(APP_ROUTES.fishing)) {
    return "Módulo pesca";
  }

  if (pathname.startsWith(APP_ROUTES.transportation)) {
    return "Módulo transporte";
  }

  return "Centro de operaciones";
};

const getBackTarget = (pathname: string) => {
  if (pathname === APP_ROUTES.fishing) {
    return APP_ROUTES.home;
  }

  if (pathname.startsWith(`${APP_ROUTES.fishing}/viaje/`)) {
    return APP_ROUTES.fishing;
  }

  if (pathname.startsWith(`${APP_ROUTES.fishing}/`)) {
    return APP_ROUTES.fishing;
  }

  if (pathname.startsWith(`${APP_ROUTES.transportationControl}/`)) {
    return APP_ROUTES.transportationControl;
  }

  if (pathname.startsWith(APP_ROUTES.transportationRoutes)) {
    return APP_ROUTES.transportation;
  }

  if (pathname.startsWith(APP_ROUTES.transportationDrivers)) {
    return APP_ROUTES.transportation;
  }

  if (pathname.startsWith(APP_ROUTES.transportationControl)) {
    return APP_ROUTES.transportation;
  }

  return null;
};

const getPreviousPath = (state: NavigationState) => {
  const from = state?.from;

  if (typeof from === "string") {
    return from;
  }

  if (from && typeof from === "object" && typeof from.pathname === "string") {
    return from.pathname;
  }

  return null;
};
