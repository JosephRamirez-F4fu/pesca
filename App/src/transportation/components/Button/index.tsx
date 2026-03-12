export interface ButtonProps {
  title: string;
  icon: JSX.Element;
  onClick?: () => void;
  to?: string;
  state?: {
    from?: string;
  };
}

import { Button as MaterialButton, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const Button = ({ title, onClick, icon, to, state }: ButtonProps) => {
  const size = "200px";
  return (
    <MaterialButton
      variant="contained"
      color="primary"
      onClick={onClick}
      component={to ? RouterLink : "button"}
      to={to}
      state={state}
      startIcon={icon}
      sx={{ width: size, height: size }}
    >
      <Typography>{title}</Typography>
    </MaterialButton>
  );
};
