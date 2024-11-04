import { Flota } from "@/pesca/domain/model";
import { CrearFlota, EliminarFlota,EditarFlota, ObtenerFlotas } from "@/pesca/useCases/flota";
import { useState, ChangeEvent, useEffect } from "react";
const flotaMocks: Flota[] = [];

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export const FlotaPage: React.FC = () => {
  const [flotas, setFlotas] = useState<Flota[]>(flotaMocks);
  const [isEditMode, setIsEditMode] = useState<{ id: number | null }>({ id: null });
  const [openDialog, setOpenDialog] = useState(false);
  const [newFlota, setNewFlota] = useState<Flota>({ id: 0, nombre: "", titular: "", capacidad: 0 });
  const serviceSave = new CrearFlota();
  const serviceEdit = new EditarFlota();
  const serviceDelete = new EliminarFlota();
  const serviceGet = new ObtenerFlotas();

  useEffect(() => {
    try {
      serviceGet.execute().then((flotas) => setFlotas(flotas));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleAdd = () => {
    setNewFlota({ id: flotas.length + 1, nombre: "", titular: "", capacidad: 0 });
    setOpenDialog(true);
  };

  const handleSave = () => {
    try {
      serviceSave.execute(newFlota).then((flota) => {
        setFlotas([...flotas, flota]);
        setOpenDialog(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: number) => {
    setIsEditMode({ id });
  };

  const handleDelete = async (id: number) => {
    try {
      await serviceDelete.execute(id).then(() => setFlotas(flotas.filter((flota) => flota.id !== id)));
    }
    catch (error) {
      console.log
    }
  };

  const handleCancel = () => {
    setIsEditMode({ id: null });
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
    const { name, value } = event.target;
    setFlotas(flotas.map((flota) => (flota.id === id ? { ...flota, [name]: value } : flota)));
  };

  const handleUpdate = async(id: number) => {
    try {
      const flota = flotas.find((flota) => flota.id === id);
      if (flota) {
        await serviceEdit.execute(id, flota).then(() => setIsEditMode({ id: null }));
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAdd}>Agregar Flota</Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Titular</TableCell>
              <TableCell>Capacidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flotas.map((flota) => (
              <TableRow key={flota.id}>
                <TableCell>
                  {isEditMode.id === flota.id ? (
                    <TextField
                      name="nombre"
                      value={flota.nombre}
                      onChange={(e) => handleFieldChange(e, flota.id)}
                    />
                  ) : (
                    flota.nombre
                  )}
                </TableCell>
                <TableCell>
                  {isEditMode.id === flota.id ? (
                    <TextField
                      name="titular"
                      value={flota.titular}
                      onChange={(e) => handleFieldChange(e, flota.id)}
                    />
                  ) : (
                    flota.titular
                  )}
                </TableCell>
                <TableCell>
                  {isEditMode.id === flota.id ? (
                    <TextField
                      name="capacidad"
                      type="number"
                      value={flota.capacidad}
                      onChange={(e) => handleFieldChange(e, flota.id)}
                    />
                  ) : (
                    flota.capacidad
                  )}
                </TableCell>
                <TableCell>
                  {isEditMode.id === flota.id ? (
                    <>
                      <Button color="primary" onClick={() => handleUpdate(flota.id)}>Gu ardar</Button>
                      <Button color="secondary" onClick={handleCancel}>Cancelar</Button>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(flota.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(flota.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Agregar Nueva Flota</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            fullWidth
            value={newFlota.nombre}
            onChange={(e) => setNewFlota({ ...newFlota, nombre: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Titular"
            fullWidth
            value={newFlota.titular}
            onChange={(e) => setNewFlota({ ...newFlota, titular: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Capacidad"
            type="number"
            fullWidth
            value={newFlota.capacidad}
            onChange={(e) => setNewFlota({ ...newFlota, capacidad: +e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button color="primary" onClick={handleSave}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


