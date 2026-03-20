import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { APP_ROUTES } from "../../../core/router/paths";
import { SalesPageShell } from "../../components/sales-page-shell";

const shortcuts = [
  {
    title: "Cuadres",
    description:
      "Crea el encabezado, registra el detalle y controla cajas vendidas contra cajas llegadas.",
    to: APP_ROUTES.salesBalances,
    icon: <ReceiptLongRoundedIcon sx={{ fontSize: 32 }} />,
  },
  {
    title: "Choferes",
    description:
      "Catálogo operativo del chofer comercial, separado del transporte legado.",
    to: APP_ROUTES.salesDrivers,
    icon: <BadgeRoundedIcon sx={{ fontSize: 32 }} />,
  },
  {
    title: "Vehículos",
    description:
      "Unidades comerciales desacopladas del vehículo usado en pesca y transporte.",
    to: APP_ROUTES.salesVehicles,
    icon: <LocalShippingRoundedIcon sx={{ fontSize: 32 }} />,
  },
  {
    title: "Productos",
    description:
      "Busca, reutiliza y crea productos sin volver a escribir el nombre en cada fila.",
    to: APP_ROUTES.salesProducts,
    icon: <Inventory2RoundedIcon sx={{ fontSize: 32 }} />,
  },
];

export const SalesMain = () => {
  return (
    <SalesPageShell
      eyebrow="Ventas"
      title="Cuadre de venta con catálogos propios y detalle trazable."
      description="Este módulo concentra la venta diaria sin tocar el vehículo legado de transporte. El flujo arranca por el cuadre y se apoya en catálogos separados de chofer, vehículo y producto."
      actions={[
        { label: "Abrir cuadres", to: APP_ROUTES.salesBalances },
        { label: "Ver productos", to: APP_ROUTES.salesProducts },
      ]}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {shortcuts.map((item) => (
          <Button
            key={item.to}
            component={RouterLink}
            to={item.to}
            state={{ from: APP_ROUTES.sales }}
            variant="text"
            sx={{
              p: 3,
              minHeight: 220,
              alignItems: "stretch",
              textAlign: "left",
              borderRadius: "28px",
              border: "1px solid rgba(9, 52, 46, 0.1)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(245,239,229,0.96) 100%)",
              boxShadow: "0 18px 44px rgba(16, 42, 67, 0.08)",
              color: "text.primary",
              transition:
                "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "rgba(110,38,30,0.22)",
                boxShadow: "0 24px 54px rgba(16, 42, 67, 0.12)",
              },
            }}
          >
            <Stack sx={{ width: "100%" }} spacing={3} justifyContent="space-between">
              <Stack spacing={2}>
                <Box
                  sx={{
                    width: 58,
                    height: 58,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "18px",
                    bgcolor: "rgba(110,38,30,0.08)",
                    color: "#6e261e",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  sx={{
                    fontFamily: '"Iowan Old Style", "Palatino Linotype", serif',
                    fontSize: { xs: "2rem", md: "2.4rem" },
                    lineHeight: 0.92,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                  {item.description}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#6e261e",
                }}
              >
                Abrir módulo
              </Typography>
            </Stack>
          </Button>
        ))}
      </Box>
    </SalesPageShell>
  );
};
