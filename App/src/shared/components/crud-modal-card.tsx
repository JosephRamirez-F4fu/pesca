import { Box, Button, Card, Modal, Typography } from "@mui/material";
import { ReactNode } from "react";

interface CrudModalCardProps {
  open: boolean;
  title: string;
  submitLabel: string;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
  width?: number;
  cardSx?: object;
}

export const CrudModalCard = ({
  open,
  title,
  submitLabel,
  onClose,
  onSubmit,
  children,
  width = 400,
  cardSx,
}: CrudModalCardProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          ...cardSx,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {children}
          <Button variant="contained" type="submit">
            {submitLabel}
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};
