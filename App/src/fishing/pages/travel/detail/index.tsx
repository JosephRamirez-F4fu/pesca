import { useMemo, useRef } from "react";
import { alpha, Box, Button, Stack, Typography } from "@mui/material";
import { useTravelDetailPage } from "./hooks/useTravelDetailPage";
import { TravelHeader } from "./components/travel-header";
import { DeleteTravelModal } from "./components/delete-travel-modal";
import { TravelDetailForm } from "./components/travel-detail-form";
import { OtherCostTravelCard } from "./components/other-cost-travel-card";
import { FishingTravelCard } from "./components/fishing-travel-card";
import { ChargerOperationCard } from "./components/charger-operation-card";
import { VehicleOilCard } from "./components/vehicle-oil-card";
import { TravelResumeCard } from "./components/travel-resume-card";

const QuickScrollControls = ({
  onScrollBottom,
  onScrollTop,
}: {
  onScrollBottom: () => void;
  onScrollTop: () => void;
}) => {
  return (
    <Stack
      spacing={1}
      sx={{
        position: "fixed",
        right: { xs: 14, md: 22 },
        bottom: { xs: 18, md: 26 },
        zIndex: (theme) => theme.zIndex.speedDial,
      }}
    >
      <Button
        variant="contained"
        onClick={onScrollTop}
        sx={{
          minWidth: 0,
          px: 1.75,
          minHeight: 40,
          borderRadius: 99,
          bgcolor: "rgba(12, 70, 68, 0.94)",
          boxShadow: "0 14px 32px rgba(16, 42, 67, 0.18)",
          "&:hover": { bgcolor: "rgba(10, 60, 58, 0.98)" },
        }}
      >
        Inicio
      </Button>
      <Button
        variant="contained"
        onClick={onScrollBottom}
        sx={{
          minWidth: 0,
          px: 1.75,
          minHeight: 40,
          borderRadius: 99,
          color: "#113b3c",
          bgcolor: alpha("#ecd5a6", 0.98),
          boxShadow: "0 14px 32px rgba(16, 42, 67, 0.14)",
          "&:hover": { bgcolor: "#e3c78e" },
        }}
      >
        Resumen
      </Button>
    </Stack>
  );
};

export const TravelDetailPage = () => {
  const {
    travelId,
    travelSelected,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
  } = useTravelDetailPage();
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollOptions = useMemo<ScrollIntoViewOptions>(
    () => ({ behavior: "smooth", block: "start" }),
    []
  );

  if (!travelId || !travelSelected || travelSelected.id !== travelId) {
    return <Typography variant="h6">Cargando viaje...</Typography>;
  }

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 2.5, md: 4, lg: 5 },
        py: { xs: 2, sm: 2.5, md: 3.5 },
        minHeight: "100%",
        background:
          "radial-gradient(circle at top right, rgba(213, 185, 123, 0.18) 0, rgba(213, 185, 123, 0) 24%), linear-gradient(180deg, #f7f2e9 0%, #f1ebdf 48%, #f8f5ef 100%)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", lg: 1180, xl: 1240 },
          mx: "auto",
        }}
      >
        <Stack spacing={{ xs: 2.5, md: 3 }}>
          <Box ref={topRef} />
          <TravelHeader travel={travelSelected} onDeleteClick={openDeleteModal} />
          <Box
            sx={{
              pt: { xs: 0.5, md: 0.75 },
            }}
          >
            <TravelDetailForm />
          </Box>
          <OtherCostTravelCard />
          <FishingTravelCard />
          <ChargerOperationCard />
          <VehicleOilCard />
          <Box ref={bottomRef} />
          <TravelResumeCard />
        </Stack>
      </Box>
      <QuickScrollControls
        onScrollTop={() => topRef.current?.scrollIntoView(scrollOptions)}
        onScrollBottom={() => bottomRef.current?.scrollIntoView(scrollOptions)}
      />
      <DeleteTravelModal open={isDeleteModalOpen} onClose={closeDeleteModal} />
    </Box>
  );
};
