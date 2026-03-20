import { Button, Card, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTravel } from "../../../../context/travel/useContext";

interface DeleteTravelModalProps {
  open: boolean;
  onClose: () => void;
}

export const DeleteTravelModal = ({
  open,
  onClose,
}: DeleteTravelModalProps) => {
  const { travelSelected, remove, SetTravelSelected } = useTravel();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!travelSelected) {
      return;
    }

    await remove(travelSelected.id);
    SetTravelSelected(null);
    navigate("/pesca");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, m: 2 }}>
        <Typography variant="h6" component="h1" gutterBottom>
          ¿Estás seguro de eliminar el viaje?
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => void handleDelete()}
        >
          Eliminar
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </Card>
    </Modal>
  );
};
