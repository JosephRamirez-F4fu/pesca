import { useState } from "react";

export const useCrudDialog = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const openCreate = (onOpen?: () => void) => {
    onOpen?.();
    setEditMode(false);
    setOpen(true);
  };

  const openEdit = (onOpen?: () => void) => {
    onOpen?.();
    setEditMode(true);
    setOpen(true);
  };

  const closeDialog = (onClose?: () => void) => {
    onClose?.();
    setEditMode(false);
    setOpen(false);
  };

  return {
    open,
    editMode,
    openCreate,
    openEdit,
    closeDialog,
  };
};
