import { useControlBoxes } from "./../../domain/control_boxes/context/useContext";
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Button,
  TableContainer,
  Paper,
  TextField,
  Typography,
  TableHead,
  Switch,
} from "@mui/material";
import {
  ControlBoxesDto,
  ControlBoxesResDto,
} from "../../domain/control_boxes/dto";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  formatIsoDate,
  formatIsoDateForInput,
  getElapsedDays,
  toIsoDateString,
} from "../../../shared/utils/date";

export const BoxControlPage = () => {
  const { controlBoxes, setControlBoxesSelected, create, remove, update } =
    useControlBoxes();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [idControlBoxe, setIdControlBoxe] = useState<number>(0);
  const [newControlBoxe, setNewControlBoxe] = useState<ControlBoxesDto>({
    code: "",
    concluded: false,
    date_arrive: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreate = () => {
    create({
      ...newControlBoxe,
      date_arrive: toIsoDateString(newControlBoxe.date_arrive) ?? "",
    });
    setNewControlBoxe({
      code: "",
      concluded: false,
      date_arrive: "",
    });
  };

  const handleDelete = async (id: number) => {
    await remove(id);
  };

  const handleUpdate = async (controlBoxe: ControlBoxesResDto) => {
    setIsEditing(true);
    setIdControlBoxe(controlBoxe.id);
    setNewControlBoxe({
      code: controlBoxe.code,
      concluded: controlBoxe.concluded,
      date_arrive: formatIsoDateForInput(controlBoxe.date_arrive),
    });
  };

  const handleSendUpdate = () => {
    update(idControlBoxe, {
      ...newControlBoxe,
      date_arrive: toIsoDateString(newControlBoxe.date_arrive) ?? "",
    });
    setIsEditing(false);
    setIdControlBoxe(0);
    setNewControlBoxe({
      code: "",
      concluded: false,
      date_arrive: "",
    });
  };

  const handleSelectControlBoxe = (controlBoxe: ControlBoxesResDto) => {
    setControlBoxesSelected(controlBoxe);
    navigate(`/cajas/control/${controlBoxe.id}`, {
      state: { from: location.pathname },
    });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <Typography variant="h4">Control de Cajas</Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          label="Código"
          value={newControlBoxe.code}
          onChange={(e) =>
            setNewControlBoxe({ ...newControlBoxe, code: e.target.value })
          }
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Fecha de llegada"
          value={newControlBoxe.date_arrive}
          type="date"
          onChange={(e) =>
            setNewControlBoxe({
              ...newControlBoxe,
              date_arrive: e.target.value,
            })
          }
          InputLabelProps={{ shrink: true }}
        />

        {isEditing && (
          <Box>
            <Typography>Concluido</Typography>
            <Switch
              checked={newControlBoxe.concluded}
              onChange={(e) =>
                setNewControlBoxe({
                  ...newControlBoxe,
                  concluded: e.target.checked,
                })
              }
            />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={isEditing ? handleSendUpdate : handleCreate}
        >
          {isEditing ? "Actualizar" : "Crear"}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Lugar</TableCell>
              <TableCell>Cajas</TableCell>
              <TableCell>Fecha de llegada</TableCell>
              <TableCell>Dias Transcurridos</TableCell>
              <TableCell> Liquidado</TableCell>

              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {controlBoxes.map((controlBoxe) => (
              <TableRow key={controlBoxe.id}>
                <TableCell>{controlBoxe.code}</TableCell>
                <TableCell>
                  {(controlBoxe.control_place ?? []).length > 0 ? (
                    (controlBoxe.control_place ?? []).map((place) => (
                      <p key={place.id}>{place.name}</p>
                    ))
                  ) : (
                    <p>No hay lugares</p>
                  )}
                </TableCell>
                <TableCell>
                  {(controlBoxe.control_place ?? []).length > 0 ? (
                    (controlBoxe.control_place ?? []).map((place) => (
                      <p key={place.id}>
                        {(place.boxes ?? [])
                          .filter(
                            (box, index, self) =>
                              index ===
                              self.findIndex(
                                (b) =>
                                  b.color === box.color && b.name === box.name
                              )
                          )
                          .map((box) => (
                            <span key={box.id}>
                              {box.color} - {box.name}
                            </span>
                          ))}
                      </p>
                    ))
                  ) : (
                    <p>No hay cajas</p>
                  )}
                </TableCell>
                <TableCell>
                  {formatIsoDate(controlBoxe.date_arrive)}
                </TableCell>
                <TableCell>
                  {controlBoxe.concluded
                    ? "Caja Concluida"
                    : `${getElapsedDays(controlBoxe.date_arrive)} días`}
                </TableCell>
                <TableCell>{controlBoxe.concluded ? "Si" : "No"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSelectControlBoxe(controlBoxe)}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(controlBoxe)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(controlBoxe.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
