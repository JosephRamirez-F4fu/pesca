import {
  alpha,
  Box,
  Card,
  CardActionArea,
  Stack,
  Typography,
} from "@mui/material";
import MonitorIcon from "@mui/icons-material/Monitor";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Item {
  title: string;
  url: string;
  icon: JSX.Element;
  eyebrow: string;
  description: string;
}

const items: Item[] = [
  {
    title: "Choferes",
    icon: <AccountBoxIcon />,
    url: "/transporte/choferes",
    eyebrow: "Base movil",
    description: "Registro de unidades, conductores y estado operativo.",
  },
  {
    title: "Rutas",
    icon: <AddRoadIcon />,
    url: "/transporte/rutas",
    eyebrow: "Mapa operativo",
    description: "Tramos, consumo esperado y tipo de recorrido.",
  },
  {
    title: "Control",
    icon: <MonitorIcon />,
    url: "/transporte/control",
    eyebrow: "Seguimiento diario",
    description: "Viajes, liquidaciones y detalle de ejecución.",
  },
  {
    title: "Uso de Petroleo",
    icon: <LocalGasStationOutlinedIcon />,
    url: "/transporte/control/petroleo-destino",
    eyebrow: "Consulta cruzada",
    description: "Consumo por destino y revisión rápida de desvíos.",
  },
];

export const MainTransportation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 2.5, md: 4, lg: 5 },
        py: { xs: 2, sm: 2.5, md: 4 },
        minHeight: "100%",
        background:
          "linear-gradient(180deg, #f5f1e8 0%, #f1ece2 52%, #f6f3ec 100%)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", lg: 1120, xl: 1180 },
          mx: "auto",
        }}
      >
        <Stack spacing={{ xs: 2, md: 2.5 }}>
          <Box
            sx={{
              px: { xs: 1, md: 0.5 },
              pt: { xs: 0.5, md: 1 },
              pb: { xs: 1, md: 1.5 },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: alpha("#0f3d3e", 0.78),
                letterSpacing: "0.24em",
                fontSize: "0.68rem",
              }}
            >
              Modulo de transporte
            </Typography>
            <Typography
              sx={{
                mt: 1,
                maxWidth: 560,
                fontWeight: 700,
                lineHeight: 1.02,
                color: "#123837",
                fontSize: { xs: "2rem", md: "2.7rem", lg: "3rem" },
              }}
            >
              Gestión simple para rutas, choferes y control diario
            </Typography>
            <Typography
              sx={{
                mt: 1.5,
                maxWidth: 520,
                color: alpha("#123837", 0.72),
                fontSize: { xs: "0.98rem", md: "1.02rem" },
              }}
            >
              Accede a cada bloque operativo desde una portada más limpia y
              directa.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
              },
              gap: { xs: 1.5, md: 2 },
            }}
          >
            {items.map((item) => (
              <Card
                key={item.url}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: alpha("#0f3d3e", 0.06),
                  boxShadow: "0 6px 18px rgba(12, 36, 34, 0.03)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.66) 0%, rgba(255,255,255,0.5) 100%)",
                  backdropFilter: "blur(8px)",
                  transition:
                    "transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    borderColor: alpha("#0f3d3e", 0.12),
                    boxShadow: "0 10px 24px rgba(12, 36, 34, 0.05)",
                  },
                }}
              >
                <CardActionArea
                  onClick={() =>
                    navigate(item.url, { state: { from: location.pathname } })
                  }
                  sx={{ p: { xs: 2, md: 2.15 }, height: "100%" }}
                >
                  <Stack spacing={1.5} height="100%">
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: "14px",
                          display: "grid",
                          placeItems: "center",
                          bgcolor: alpha("#0f3d3e", 0.045),
                          color: alpha("#0f7d79", 0.92),
                        }}
                      >
                        {item.icon}
                      </Box>
                      <ArrowOutwardRoundedIcon
                        sx={{ color: alpha("#0f3d3e", 0.24), fontSize: 21 }}
                      />
                    </Stack>

                    <Box>
                      <Typography
                        variant="overline"
                        sx={{
                          color: "#0f7d79",
                          letterSpacing: "0.22em",
                          fontSize: "0.64rem",
                        }}
                      >
                        {item.eyebrow}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 0.7,
                          fontWeight: 650,
                          color: "#0f2746",
                          fontSize: { xs: "1.18rem", md: "1.4rem" },
                          lineHeight: 1.06,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        color: alpha("#163a59", 0.72),
                        fontSize: "0.9rem",
                        maxWidth: 320,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Stack>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
