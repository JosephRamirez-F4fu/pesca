import {
  alpha,
  Box,
  Card,
  CardContent,
  Paper,
  Table,
  TableContainer,
  TableBody,
  Typography,
} from "@mui/material";

import { TravelRow } from "../travel-row";
import { TravelTableHead } from "../travel-table-head";

import { travelResDto } from "../../../domain/dto/travel.dto";
import { useLocation, useNavigate } from "react-router-dom";
import { formatIsoDate } from "../../../../shared/utils/date";
import { APP_ROUTES } from "../../../../core/router/paths";

export interface TravelTableProps {
  travels: travelResDto[];
}

export const TravelTable = ({ travels }: TravelTableProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dateFormater = (date: string) => formatIsoDate(date);

  const goToDetail = (travel: travelResDto) => {
    navigate(APP_ROUTES.fishingTravelDetail(travel.id), {
      state: { from: location.pathname },
    });
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: alpha("#0f3d3e", 0.12),
        boxShadow: "0 28px 80px rgba(10, 33, 34, 0.08)",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,244,235,0.96) 100%)",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            px: { xs: 2.5, md: 3 },
            py: 2,
            borderBottom: "1px solid",
            borderColor: alpha("#0f3d3e", 0.08),
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.65rem", md: "1.9rem" } }}>
            Historial de viajes
          </Typography>
        </Box>

        <Box sx={{ p: { xs: 1.5, md: 2 } }}>
          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              borderRadius: "20px 20px 0 0",
              border: "1px solid",
              borderColor: alpha("#0f3d3e", 0.1),
              backgroundColor: alpha("#ffffff", 0.9),
            }}
          >
            <TableContainer>
              <Table>
                <TravelTableHead />
                <TableBody>
                  {travels.map((travel) => (
                    <TravelRow
                      key={travel.id}
                      travel={travel}
                      goToDetail={goToDetail}
                      dateFormater={dateFormater}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </CardContent>
    </Card>
  );
};
