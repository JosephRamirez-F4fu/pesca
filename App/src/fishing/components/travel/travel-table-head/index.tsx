import { alpha, TableRow, TableCell, TableHead } from "@mui/material";

export const TravelTableHead = () => {
  return (
    <TableHead>
      <TableRow
        sx={{
          background:
            "linear-gradient(90deg, rgba(15,61,62,0.98) 0%, rgba(28,84,86,0.96) 100%)",
        }}
      >
        <TableCell sx={{ color: "#f7f1e6", borderBottomColor: alpha("#fff", 0.08) }}>
          Codigo
        </TableCell>
        <TableCell sx={{ color: "#f7f1e6", borderBottomColor: alpha("#fff", 0.08) }}>
          Creado
        </TableCell>
        <TableCell sx={{ color: "#f7f1e6", borderBottomColor: alpha("#fff", 0.08) }}>
          Pago Tripulantes
        </TableCell>
        <TableCell sx={{ color: "#f7f1e6", borderBottomColor: alpha("#fff", 0.08) }}>
          Pago Petroleo Lancha
        </TableCell>
        <TableCell sx={{ color: "#f7f1e6", borderBottomColor: alpha("#fff", 0.08) }}>
          Pago Estibadores
        </TableCell>
        <TableCell sx={{ color: "#f7f1e6", borderBottomColor: alpha("#fff", 0.08) }}>
          Pago Petroleo Carro
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
