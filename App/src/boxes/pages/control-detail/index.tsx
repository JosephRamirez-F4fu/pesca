import { useState } from "react";
import {
  Button,
  Card,
  InputLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useBoxesReturn } from "../../domain/boxes_return/context";
import { useBoxes } from "../../domain/boxes/context";
import { useBoxesPlace } from "../../domain/boxes-place/context";
import { useControlBoxes } from "../../domain/control_boxes/context";
import { BoxesDto, BoxesResDto } from "../../domain/boxes/dto";
import {
  BoxesReturnDto,
  BoxesReturnResDto,
} from "../../domain/boxes_return/dto";
import { BoxesPlaceDto, BoxesPlaceResDto } from "../../domain/boxes-place/dto";
import { CrudModalCard } from "../../../shared/components/crud-modal-card";
import { useCrudDialog } from "../../../shared/hooks/useCrudDialog";
import {
  formatIsoDate,
  formatIsoDateForInput,
  getElapsedDays,
  toIsoDateString,
} from "../../../shared/utils/date";

const defaultBoxPlace: BoxesPlaceDto = {
  name: "VENTANILLA",
  concluded: false,
  date_arrive: "",
  hasLiquid: false,
  id_control_boxes: 0,
};

const defaultBox: BoxesDto = {
  name: "",
  color: "",
  quantity: 0,
  id_control_place: 0,
};

const defaultBoxReturn: BoxesReturnDto = {
  quantity: 0,
  id_boxes: 0,
  date: "",
};

export const BoxControlPageDetail = () => {
  const { controlBoxesSelected } = useControlBoxes();

  return (
    <>
      {controlBoxesSelected && (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            bgcolor: "primary.main",
            color: "white",
            m: 2,
          }}
        >
          <Typography variant="h6">{controlBoxesSelected.code}</Typography>
          <Typography variant="h6">
            {formatIsoDate(controlBoxesSelected.date_arrive)}
          </Typography>
        </Card>
      )}
      <BoxesPlace />
      <BoxBoxes />
    </>
  );
};

export const BoxesPlace = () => {
  const { boxesPlace, create, update, remove } = useBoxesPlace();
  const { controlBoxesSelected } = useControlBoxes();
  const [boxPlaceId, setBoxPlaceId] = useState(0);
  const [form, setForm] = useState<BoxesPlaceDto>(defaultBoxPlace);
  const { open, editMode, openCreate, openEdit, closeDialog } =
    useCrudDialog();

  const resetForm = () => {
    setBoxPlaceId(0);
    setForm(defaultBoxPlace);
  };

  const handleCreate = async () => {
    if (!controlBoxesSelected) return;

    await create({
      ...form,
      date_arrive: toIsoDateString(form.date_arrive) ?? "",
      id_control_boxes: controlBoxesSelected.id,
    });
    closeDialog(resetForm);
  };

  const handleUpdate = async () => {
    await update(boxPlaceId, {
      ...form,
      date_arrive: toIsoDateString(form.date_arrive) ?? "",
    });
    closeDialog(resetForm);
  };

  const handleDelete = async (id: number) => {
    await remove(id);
    resetForm();
  };

  const handleEdit = (box: BoxesPlaceResDto) => {
    openEdit(() => {
      setBoxPlaceId(box.id);
      setForm({
        name: box.name,
        concluded: box.concluded,
        date_arrive: formatIsoDateForInput(box.date_arrive),
        hasLiquid: box.hasLiquid,
        id_control_boxes: box.id_control_boxes,
      });
    });
  };

  return (
    <Card>
      <Button onClick={() => openCreate(resetForm)}>Añadir Control</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Concluded</TableCell>
              <TableCell>Date Arrive</TableCell>
              <TableCell>Days Transurred</TableCell>
              <TableCell>Has Liquid</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boxesPlace.map((box) => (
              <TableRow key={box.id}>
                <TableCell>{box.name}</TableCell>
                <TableCell>{box.concluded ? "Yes" : "No"}</TableCell>
                <TableCell>{formatIsoDate(box.date_arrive)}</TableCell>
                <TableCell>{getElapsedDays(box.date_arrive, "ceil")}</TableCell>
                <TableCell>{box.hasLiquid ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(box)}>Edit</Button>
                  <Button onClick={() => void handleDelete(box.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CrudModalCard
        open={open}
        title={editMode ? "Edit Box" : "Add New Box"}
        submitLabel={editMode ? "Update" : "Create"}
        onClose={() => closeDialog(resetForm)}
        onSubmit={() => void (editMode ? handleUpdate() : handleCreate())}
      >
        <TextField
          label="Lugar"
          select
          value={form.name}
          onChange={(event) =>
            setForm({ ...form, name: event.target.value })
          }
          fullWidth
          InputLabelProps={{ shrink: true }}
          SelectProps={{ native: true }}
        >
          <option value="VENTANILLA">VENTANILLA</option>
          <option value="VILLAMARIA">VILLAMARIA</option>
          <option value="GRIFO">GRIFO</option>
        </TextField>
        <TextField
          label="Date Arrive"
          type="date"
          value={form.date_arrive}
          onChange={(event) =>
            setForm({ ...form, date_arrive: event.target.value })
          }
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <InputLabel>Concluded</InputLabel>
        <Switch
          checked={form.concluded}
          onChange={(event) =>
            setForm({ ...form, concluded: event.target.checked })
          }
        />
        <InputLabel>Has Liquid</InputLabel>
        <Switch
          checked={form.hasLiquid}
          onChange={(event) =>
            setForm({ ...form, hasLiquid: event.target.checked })
          }
        />
      </CrudModalCard>
    </Card>
  );
};

export const BoxBoxes = () => {
  const { create, update, remove, setBoxesSelected } = useBoxes();
  const { boxesPlace } = useBoxesPlace();
  const [boxId, setBoxId] = useState(0);
  const [form, setForm] = useState<BoxesDto>(defaultBox);
  const {
    open: openBox,
    editMode: editBoxMode,
    openCreate: openCreateBox,
    openEdit: openEditBox,
    closeDialog: closeBoxDialog,
  } = useCrudDialog();
  const {
    open: openReturn,
    editMode: editReturnMode,
    openCreate: openCreateReturn,
    openEdit: openEditReturn,
    closeDialog: closeReturnDialog,
  } = useCrudDialog();

  const resetBoxForm = () => {
    setBoxId(0);
    setForm(defaultBox);
  };

  const handleCreate = async () => {
    await create(form);
    closeBoxDialog(resetBoxForm);
  };

  const handleUpdate = async () => {
    await update(boxId, form);
    closeBoxDialog(resetBoxForm);
  };

  const handleDelete = async (id: number) => {
    await remove(id);
    resetBoxForm();
  };

  const handleEdit = (box: BoxesResDto) => {
    openEditBox(() => {
      setBoxId(box.id);
      setForm({
        name: box.name,
        color: box.color,
        quantity: box.quantity,
        id_control_place: box.id_control_place,
      });
    });
  };

  return (
    <>
      {boxesPlace.map((place) => (
        <Card key={place.id}>
          <Typography variant="h6">{place.name}</Typography>
          <Button
            onClick={() =>
              openCreateBox(() => {
                setBoxId(0);
                setForm({ ...defaultBox, id_control_place: place.id });
              })
            }
          >
            Add Box
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {place.boxes.map((box) => (
                  <TableRow key={box.id}>
                    <TableCell>{box.name}</TableCell>
                    <TableCell>{box.color}</TableCell>
                    <TableCell>{box.quantity}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setBoxesSelected(box);
                          openCreateReturn();
                        }}
                      >
                        Liquidar
                      </Button>
                      <Button onClick={() => handleEdit(box)}>Edit</Button>
                      <Button onClick={() => void handleDelete(box.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      ))}
      <CrudModalCard
        open={openBox}
        title={editBoxMode ? "Edit Box" : "Add New Box"}
        submitLabel={editBoxMode ? "Update" : "Create"}
        onClose={() => closeBoxDialog(resetBoxForm)}
        onSubmit={() => void (editBoxMode ? handleUpdate() : handleCreate())}
      >
        <TextField
          label="Name"
          value={form.name}
          onChange={(event) =>
            setForm({ ...form, name: event.target.value })
          }
          fullWidth
        />
        <TextField
          label="Color"
          value={form.color}
          onChange={(event) =>
            setForm({ ...form, color: event.target.value })
          }
          fullWidth
        />
        <TextField
          label="Quantity"
          value={form.quantity}
          type="number"
          onChange={(event) => {
            const quantity = Number(event.target.value);
            setForm({ ...form, quantity: Number.isNaN(quantity) ? 0 : quantity });
          }}
          fullWidth
        />
      </CrudModalCard>
      <BoxControlBoxesReturn
        open={openReturn}
        editMode={editReturnMode}
        onClose={() =>
          closeReturnDialog(() => {
            setBoxesSelected(null);
          })
        }
        onOpenEdit={openEditReturn}
      />
    </>
  );
};

interface BoxControlBoxesReturnProps {
  open: boolean;
  editMode: boolean;
  onClose: () => void;
  onOpenEdit: (onOpen?: () => void) => void;
}

export const BoxControlBoxesReturn = ({
  open,
  editMode,
  onClose,
  onOpenEdit,
}: BoxControlBoxesReturnProps) => {
  const {
    create,
    remove,
    update,
    boxesReturn,
    setBoxesReturnSelected,
    boxesReturnSelected,
  } = useBoxesReturn();
  const { boxesSelected } = useBoxes();
  const [form, setForm] = useState<BoxesReturnDto>(defaultBoxReturn);

  const resetForm = () => {
    setBoxesReturnSelected(null);
    setForm(defaultBoxReturn);
  };

  const handleCreate = async () => {
    if (!boxesSelected) return;

    await create({
      ...form,
      id_boxes: boxesSelected.id,
      date: toIsoDateString(form.date) ?? "",
    });
    onClose();
    resetForm();
  };

  const handleUpdate = async () => {
    if (!boxesReturnSelected) return;

    await update(boxesReturnSelected.id, {
      ...form,
      id_boxes: boxesReturnSelected.id_boxes,
      date: toIsoDateString(form.date) ?? "",
    });
    onClose();
    resetForm();
  };

  const handleEdit = (boxReturn: BoxesReturnResDto) => {
    onOpenEdit(() => {
      setBoxesReturnSelected(boxReturn);
      setForm({
        quantity: boxReturn.quantity,
        id_boxes: boxReturn.id_boxes,
        date: formatIsoDateForInput(boxReturn.date),
      });
    });
  };

  const handleDelete = async (id: number) => {
    await remove(id);
  };

  const pending =
    (boxesSelected?.quantity ?? 0) -
    boxesReturn.reduce((acc, boxReturn) => acc + boxReturn.quantity, 0);

  return (
    <CrudModalCard
      open={open}
      title={editMode ? "Edit Return" : "Add New Return"}
      submitLabel={editMode ? "Update" : "Create"}
      onClose={() => {
        onClose();
        resetForm();
      }}
      onSubmit={() => void (editMode ? handleUpdate() : handleCreate())}
      width={500}
    >
      <TextField
        label="Quantity"
        value={form.quantity}
        type="number"
        onChange={(event) => {
          const quantity = Number(event.target.value);
          setForm({ ...form, quantity: Number.isNaN(quantity) ? 0 : quantity });
        }}
        fullWidth
      />
      <TextField
        label="Date"
        type="date"
        value={form.date}
        onChange={(event) => setForm({ ...form, date: event.target.value })}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Card>
        <Typography variant="h6">Pendientes</Typography>
        <Typography variant="h6">{pending}</Typography>
      </Card>
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Quantity</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boxesReturn.map((boxReturn) => (
              <TableRow key={boxReturn.id}>
                <TableCell>{boxReturn.quantity}</TableCell>
                <TableCell>{formatIsoDate(boxReturn.date)}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(boxReturn)}>Edit</Button>
                  <Button onClick={() => void handleDelete(boxReturn.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CrudModalCard>
  );
};
