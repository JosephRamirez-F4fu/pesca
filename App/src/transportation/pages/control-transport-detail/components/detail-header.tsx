import { useEffect, useState } from "react";
import { alpha, Box, Stack, Typography } from "@mui/material";
import { VehicleDto } from "../../../dto/vehicle";
import { VehicleRouteDetailResDto } from "../../../dto/vehicle_route_detail";
import { VehicleRouteResDto } from "../../../dto/vehicle-route";
import { formatTransportDate } from "../utils";

interface DetailHeaderProps {
  routeSelected: VehicleRouteResDto;
  vehicle: VehicleDto;
  routeDetail: VehicleRouteDetailResDto;
}

export const DetailHeader = ({
  routeSelected,
  vehicle,
  routeDetail,
}: DetailHeaderProps) => {
  const [isCompact, setIsCompact] = useState(false);
  const sheetState = String(routeSelected.state || "SIN ESTADO");
  const isDelivered =
    sheetState.toUpperCase().includes("ENTREG") &&
    !sheetState.toUpperCase().includes("NO ");
  const isLiquidated =
    String(routeSelected.is_concluded).toLowerCase() === "si" ||
    String(routeSelected.is_concluded).toLowerCase() === "true";

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 96);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "sticky",
        top: { xs: 86, md: 104 },
        zIndex: 9,
        transition: "top 180ms ease",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: isCompact ? 1.25 : 2.2,
          p: {
            xs: isCompact ? 1.6 : 2.25,
            md: isCompact ? 1.9 : 2.8,
          },
          borderRadius: isCompact ? 3.2 : 4,
          border: "1px solid",
          borderColor: alpha("#0f3d3e", 0.12),
          boxShadow: isCompact
            ? "0 14px 34px rgba(10, 33, 34, 0.10)"
            : "0 20px 60px rgba(10, 33, 34, 0.10)",
          background:
            "radial-gradient(circle at top left, rgba(215, 183, 107, 0.22) 0, rgba(215, 183, 107, 0) 44%), linear-gradient(135deg, rgba(11,57,59,0.96) 0%, rgba(25,79,82,0.96) 52%, rgba(38,103,101,0.92) 100%)",
          color: "#f7f1e6",
          backdropFilter: "blur(14px)",
          transition:
            "padding 180ms ease, gap 180ms ease, border-radius 180ms ease, box-shadow 180ms ease",
        }}
      >
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={isCompact ? 1.2 : 2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", lg: "flex-start" }}
        >
          <Box sx={{ maxWidth: 760 }}>
            <Typography
              variant="overline"
              sx={{
                letterSpacing: "0.22em",
                opacity: 0.74,
                fontSize: isCompact ? "0.62rem" : "0.68rem",
              }}
            >
              Detalle operativo
            </Typography>
            <Typography
              sx={{
                mt: isCompact ? 0.2 : 0.6,
                fontWeight: 800,
                lineHeight: 1.04,
                fontSize: {
                  xs: isCompact ? "1.2rem" : "1.65rem",
                  md: isCompact ? "1.55rem" : "2.25rem",
                },
                transition: "font-size 180ms ease, margin 180ms ease",
              }}
            >
              Transporte de {vehicle.name} · {vehicle.user}
            </Typography>
            {!isCompact && (
              <Typography sx={{ mt: 1.25, color: alpha("#f7f1e6", 0.82) }}>
                Salida del {formatTransportDate(routeSelected.createdAt)}
                {routeDetail.point_charge
                  ? ` con punto de carga en ${routeDetail.point_charge}.`
                  : "."}
              </Typography>
            )}
          </Box>

          <Stack
            direction={{ xs: "row", lg: "column" }}
            spacing={isCompact ? 0.75 : 1}
            useFlexGap
            flexWrap="wrap"
            sx={{ minWidth: { lg: isCompact ? 220 : 280 } }}
          >
            <InfoTile label="Vehiculo" value={vehicle.plate} compact={isCompact} />
            <InfoTile
              label="Salida"
              value={formatTransportDate(routeSelected.createdAt)}
              compact={isCompact}
            />
          </Stack>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: {
              xs: "1fr",
              md: isCompact ? "repeat(3, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          <StatusStrip
            label="Estado de hoja"
            value={sheetState}
            caption={
              isDelivered ? "Documento ya entregado" : "Pendiente de entrega"
            }
            accent={isDelivered ? "#90d1bf" : "#f1b487"}
            compact={isCompact}
          />
          <StatusStrip
            label="Liquidado"
            value={isLiquidated ? "Cerrado" : "Pendiente"}
            caption={
              isLiquidated
                ? "El viaje ya cerro su liquidacion"
                : "Aun faltan ajustes de cierre"
            }
            accent={isLiquidated ? "#90d1bf" : "#f1b487"}
            compact={isCompact}
          />
          <StatusStrip
            label="Punto de carga"
            value={routeDetail.point_charge || "Sin registrar"}
            caption="Referencia operativa del viaje"
            accent="#a8d3d1"
            compact={isCompact}
          />
        </Box>
      </Box>
    </Box>
  );
};

const InfoTile = ({
  label,
  value,
  accent,
  tone = "neutral",
  compact = false,
}: {
  label: string;
  value: string;
  accent?: string;
  tone?: "neutral" | "success" | "warning";
  compact?: boolean;
}) => (
  <Box
    sx={{
      px: compact ? 1.2 : 1.5,
      py: compact ? 0.9 : 1.2,
      minWidth: compact ? 110 : 124,
      borderRadius: compact ? 2.3 : 3,
      border: "1px solid",
      borderColor:
        tone === "neutral"
          ? alpha("#f7f1e6", 0.16)
          : alpha(accent || "#f7f1e6", 0.32),
      backgroundColor:
        tone === "neutral"
          ? alpha("#f7f1e6", 0.08)
          : alpha(accent || "#f7f1e6", 0.14),
      transition: "all 180ms ease",
    }}
  >
    <Typography
      sx={{
        fontSize: compact ? 9 : 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: alpha("#f7f1e6", 0.68),
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        mt: compact ? 0.3 : 0.55,
        fontWeight: 800,
        color: "#f7f1e6",
        fontSize: compact ? 13 : 16,
      }}
    >
      {value}
    </Typography>
  </Box>
);

const StatusStrip = ({
  label,
  value,
  caption,
  accent,
  compact = false,
}: {
  label: string;
  value: string;
  caption: string;
  accent: string;
  compact?: boolean;
}) => (
  <Box
    sx={{
      p: compact ? 1.05 : 1.4,
      borderRadius: compact ? 2.4 : 3,
      border: "1px solid",
      borderColor: alpha(accent, 0.24),
      backgroundColor: alpha("#f7f1e6", 0.08),
      transition: "all 180ms ease",
    }}
  >
    <Typography
      sx={{
        fontSize: compact ? 9 : 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: alpha("#f7f1e6", 0.64),
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        mt: compact ? 0.3 : 0.6,
        fontWeight: 900,
        color: accent,
        fontSize: { xs: compact ? "0.92rem" : "1rem", md: compact ? "0.96rem" : "1.05rem" },
      }}
    >
      {value}
    </Typography>
    {!compact && (
      <Typography sx={{ mt: 0.45, color: alpha("#f7f1e6", 0.7), fontSize: 13 }}>
        {caption}
      </Typography>
    )}
  </Box>
);
