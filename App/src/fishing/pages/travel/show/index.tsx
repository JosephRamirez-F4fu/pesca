import { useMemo, useState } from "react";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DirectionsBoatFilledRoundedIcon from "@mui/icons-material/DirectionsBoatFilledRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WaterRoundedIcon from "@mui/icons-material/WaterRounded";

import { useBoat } from "../../../context/boat";
import { useTravel } from "../../../context/travel";
import { TravelTable } from "../../../components/travel/travel-table";
import { TankPriceControl } from "../../../components/tank-price/tank-price-control";
import { TravelCreateForm } from "../../../components/travel/travel-create-form";

const surfaceSx = {
  borderRadius: 4,
  border: "1px solid",
  borderColor: alpha("#0f3d3e", 0.12),
  boxShadow: "0 28px 80px rgba(10, 33, 34, 0.08)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,244,235,0.96) 100%)",
};

export interface TravelCreateModalProps {
  open: boolean;
  close: () => void;
}

export const TravelCreateModal = ({
  open,
  close,
}: TravelCreateModalProps) => {
  return (
    <Modal open={open} onClose={close}>
      <Box
        sx={{
          ...surfaceSx,
          width: { xs: "calc(100% - 24px)", md: 900 },
          maxHeight: "88vh",
          overflow: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{
            px: { xs: 2.5, md: 3.5 },
            py: 2.5,
            borderBottom: "1px solid",
            borderColor: alpha("#0f3d3e", 0.08),
            background:
              "linear-gradient(135deg, rgba(12,59,61,0.96) 0%, rgba(33,92,94,0.92) 100%)",
            color: "#f7f1e6",
          }}
        >
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.24em", opacity: 0.8, fontSize: "0.68rem" }}
          >
            Nueva salida
          </Typography>
          <Typography
            sx={{
              fontWeight: 800,
              mt: 0.75,
              fontSize: { xs: "1.55rem", md: "1.85rem" },
              lineHeight: 1.05,
            }}
          >
            Registrar viaje de pesca
          </Typography>
          <Typography
            sx={{
              mt: 0.75,
              maxWidth: 560,
              opacity: 0.9,
              fontSize: { xs: "0.92rem", md: "0.98rem" },
            }}
          >
            Completa la bitacora operativa, el consumo y los costos base del
            viaje desde una sola superficie.
          </Typography>
        </Box>
        <TravelCreateForm close={close} />
      </Box>
    </Modal>
  );
};

interface BoatFormDialogProps {
  actionLabel: string;
  initialName?: string;
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
}

const BoatFormDialog = ({
  actionLabel,
  initialName = "",
  open,
  title,
  onClose,
  onSubmit,
}: BoatFormDialogProps) => {
  const [name, setName] = useState(initialName);

  const handleClose = () => {
    setName(initialName);
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    await onSubmit(name.trim());
    setName("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,241,230,0.96) 100%)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background:
            "linear-gradient(135deg, rgba(12,59,61,0.96) 0%, rgba(33,92,94,0.92) 100%)",
          color: "#f7f1e6",
          fontWeight: 700,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <TextField
          autoFocus
          fullWidth
          label="Nombre de la lancha"
          value={name}
          onChange={(event) => setName(event.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const LanchaSelect = () => {
  const { boat, boats, setBoat, create, update, remove } = useBoat();
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const activeBoatName = boat?.name ?? "Sin lancha seleccionada";

  const handleCreate = async (name: string) => {
    await create({ name });
  };

  const handleEdit = async (name: string) => {
    if (!boat?.id) return;
    await update(boat.id, { name });
  };

  const handleDelete = async () => {
    if (!boat?.id) return;
    await remove(boat.id);
  };

  return (
    <>
      <Card sx={{ ...surfaceSx, overflow: "hidden" }}>
        <Box
          sx={{
            px: { xs: 2.5, md: 3.25 },
            py: { xs: 2.5, md: 3 },
            background:
              "radial-gradient(circle at top left, rgba(215, 183, 107, 0.26) 0, rgba(215, 183, 107, 0) 46%), linear-gradient(135deg, rgba(11,57,59,1) 0%, rgba(25,79,82,0.98) 52%, rgba(38,103,101,0.92) 100%)",
            color: "#f7f1e6",
          }}
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={3}
            justifyContent="space-between"
          >
            <Stack spacing={1.5} sx={{ maxWidth: 620 }}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: "0.24em", opacity: 0.72, fontSize: "0.68rem" }}
              >
                Modulo de pesca
              </Typography>
              <Typography
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.02,
                  fontSize: { xs: "1.95rem", md: "2.45rem", lg: "2.85rem" },
                  maxWidth: 520,
                }}
              >
                Operacion de viajes y combustible
              </Typography>
              <Typography
                sx={{
                  color: alpha("#f7f1e6", 0.82),
                  fontSize: { xs: "0.98rem", md: "1.02rem" },
                  maxWidth: 560,
                }}
              >
                Administra la embarcacion activa, registra nuevas salidas y
                mantén a la vista el estado operativo del día.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "row", md: "column" }}
              spacing={1.5}
              sx={{ minWidth: { md: 240 } }}
            >
              <Chip
                icon={<DirectionsBoatFilledRoundedIcon />}
                label={`${boats.length} lanchas registradas`}
                sx={{
                  justifyContent: "flex-start",
                  bgcolor: alpha("#f7f1e6", 0.14),
                  color: "#f7f1e6",
                  borderRadius: 99,
                  height: 36,
                  "& .MuiChip-label": { fontSize: "0.82rem" },
                }}
              />
              <Chip
                icon={<WaterRoundedIcon />}
                label={activeBoatName}
                sx={{
                  justifyContent: "flex-start",
                  bgcolor: alpha("#f7f1e6", 0.14),
                  color: "#f7f1e6",
                  borderRadius: 99,
                  height: 36,
                  "& .MuiChip-label": { fontSize: "0.82rem" },
                }}
              />
            </Stack>
          </Stack>
        </Box>

        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Stack spacing={2.5}>
            <Stack
              direction={{ xs: "column", xl: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", xl: "center" }}
              justifyContent="space-between"
            >
              <TextField
                select
                fullWidth
                label="Lancha activa"
                value={boat?.id ?? ""}
                onChange={(event) => {
                  const selectedId = Number(event.target.value);
                  const selectedBoat =
                    boats.find((item) => item.id === selectedId) ?? null;
                  setBoat(selectedBoat);
                }}
                sx={{
                  maxWidth: { xl: 420 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                    backgroundColor: alpha("#ffffff", 0.92),
                  },
                }}
              >
                {boats.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>

              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                justifyContent={{ xs: "stretch", xl: "flex-end" }}
              >
                <Button
                  variant="outlined"
                  startIcon={<EditRoundedIcon />}
                  onClick={() => setOpenEdit(true)}
                  disabled={!boat?.id}
                  sx={{ borderRadius: 99, minWidth: 116, minHeight: 42, fontSize: "0.92rem" }}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlineRoundedIcon />}
                  onClick={handleDelete}
                  disabled={!boat?.id}
                  sx={{ borderRadius: 99, minWidth: 116, minHeight: 42, fontSize: "0.92rem" }}
                >
                  Eliminar
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddRoundedIcon />}
                  onClick={() => setOpenCreate(true)}
                  sx={{ borderRadius: 99, minWidth: 136, minHeight: 42, fontSize: "0.92rem" }}
                >
                  Nueva lancha
                </Button>
              </Stack>
            </Stack>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{ color: "text.secondary" }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <DirectionsBoatFilledRoundedIcon color="primary" />
                <Typography>
                  Selecciona la embarcación activa antes de registrar un viaje.
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocalShippingOutlinedIcon color="primary" />
                <Typography>
                  Los viajes y costos se filtran por lancha automáticamente.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <BoatFormDialog
        actionLabel="Guardar cambios"
        initialName={boat?.name ?? ""}
        open={openEdit}
        title="Editar lancha"
        onClose={() => setOpenEdit(false)}
        onSubmit={handleEdit}
      />
      <BoatFormDialog
        actionLabel="Crear lancha"
        open={openCreate}
        title="Registrar nueva lancha"
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreate}
      />
    </>
  );
};

export const TravelPage = () => {
  const { travels } = useTravel();
  const [openModal, setOpenModal] = useState(false);

  const metrics = useMemo(() => {
    const activeTravels = travels.filter(
      (travel) =>
        !travel.fishing_date_canceled &&
        !travel.oil_date_canceled &&
        !travel.oil_vehicle_date_canceled
    ).length;
    const canceledProcesses = travels.reduce((acc, travel) => {
      return (
        acc +
        Number(Boolean(travel.fishing_date_canceled)) +
        Number(Boolean(travel.oil_date_canceled)) +
        Number(Boolean(travel.oil_vehicle_date_canceled)) +
        Number(Boolean(travel.charger_operation?.date_canceled))
      );
    }, 0);

    return {
      activeTravels,
      canceledProcesses,
      totalTravels: travels.length,
    };
  }, [travels]);

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 2.5, md: 4, lg: 5 },
        py: { xs: 2, sm: 2.5, md: 4 },
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
        <Stack spacing={{ xs: 2.5, md: 3.5 }}>
          <LanchaSelect />

          <Stack
            direction={{ xs: "column", xl: "row" }}
            spacing={{ xs: 2.5, md: 3 }}
            alignItems="stretch"
          >
            <Card
              sx={{
                ...surfaceSx,
                flex: "1 1 auto",
                background:
                  "linear-gradient(135deg, rgba(255,250,241,1) 0%, rgba(248,243,232,0.98) 100%)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.25, sm: 2.75, lg: 3 } }}>
                <Stack spacing={2.5}>
                  <Box>
                    <Typography
                      variant="overline"
                      sx={{ color: "primary.main", letterSpacing: "0.22em", fontSize: "0.68rem" }}
                    >
                      Jornada actual
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        mt: 0.75,
                        fontSize: { xs: "1.7rem", md: "2rem" },
                      }}
                    >
                      Centro de operaciones
                    </Typography>
                  </Box>

                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    useFlexGap
                    flexWrap="wrap"
                  >
                    <Card
                      sx={{
                        flex: "1 1 220px",
                        minWidth: { xs: "100%", md: 210 },
                        p: 2,
                        borderRadius: 3,
                        bgcolor: alpha("#0f3d3e", 0.04),
                        boxShadow: "none",
                      }}
                    >
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: "2rem", md: "2.2rem" }, lineHeight: 1 }}>
                        {metrics.totalTravels}
                      </Typography>
                      <Typography color="text.secondary" sx={{ fontSize: "0.98rem" }}>
                        Viajes registrados
                      </Typography>
                    </Card>
                    <Card
                      sx={{
                        flex: "1 1 220px",
                        minWidth: { xs: "100%", md: 210 },
                        p: 2,
                        borderRadius: 3,
                        bgcolor: alpha("#1f6a5d", 0.08),
                        boxShadow: "none",
                      }}
                    >
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: "2rem", md: "2.2rem" }, lineHeight: 1 }}>
                        {metrics.activeTravels}
                      </Typography>
                      <Typography color="text.secondary" sx={{ fontSize: "0.98rem" }}>
                        Operaciones activas
                      </Typography>
                    </Card>
                    <Card
                      sx={{
                        flex: "1 1 220px",
                        minWidth: { xs: "100%", md: 210 },
                        p: 2,
                        borderRadius: 3,
                        bgcolor: alpha("#8e4d2c", 0.08),
                        boxShadow: "none",
                      }}
                    >
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: "2rem", md: "2.2rem" }, lineHeight: 1 }}>
                        {metrics.canceledProcesses}
                      </Typography>
                      <Typography color="text.secondary" sx={{ fontSize: "0.98rem" }}>
                        Procesos cancelados
                      </Typography>
                    </Card>
                  </Stack>

                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={1.5}
                    alignItems={{ xs: "stretch", lg: "center" }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<AddRoundedIcon />}
                      onClick={() => setOpenModal(true)}
                      sx={{ borderRadius: 99, minHeight: 46, px: 2.5, fontSize: "0.95rem" }}
                    >
                      Registrar viaje
                    </Button>
                    <Typography color="text.secondary" sx={{ fontSize: "0.98rem" }}>
                      Abre una nueva salida con costos base, fecha y código de
                      control en un solo formulario.
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Box sx={{ flex: { xl: "0 0 340px" }, minWidth: 0 }}>
              <TankPriceControl />
            </Box>
          </Stack>

          <TravelTable travels={travels} />
        </Stack>
      </Box>

      <TravelCreateModal
        open={openModal}
        close={() => setOpenModal(false)}
      />
    </Box>
  );
};
