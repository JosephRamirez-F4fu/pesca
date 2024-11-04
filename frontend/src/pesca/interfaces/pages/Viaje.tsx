import { useState } from 'react';
import { ViajeSummary } from '@/pesca/domain/model';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Alert } from '@mui/material';

// Simulación de datos de viajes
const viajes: ViajeSummary[] = [
    { finalizado: false, gasto_total: 0, id: 1, flota: 'Flota 1', pesca_total: 0 },
    { finalizado: true, gasto_total: 200, id: 2, flota: 'Flota 2', pesca_total: 200 },
    { finalizado: false, gasto_total: 0, id: 3, flota: 'Flota 3', pesca_total: 0 },
    { finalizado: true, gasto_total: 400, id: 4, flota: 'Flota 4', pesca_total: 400 },
];

export const ViajePage = () => {
    const [viajeSeleccionado, setViajeSeleccionado] = useState<ViajeSummary | null>(null);

    const handleRowClick = (viaje: ViajeSummary) => {
        setViajeSeleccionado(viaje); // Abre el detalle del viaje
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Lista de Viajes</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Flota</TableCell>
                            <TableCell>Gastos</TableCell>
                            <TableCell>Pesca</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {viajes.map((viaje) => (
                            <TableRow
                                key={viaje.id}
                                style={{
                                    backgroundColor: viaje.finalizado ? '#e8f5e9' : '#ffebee',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleRowClick(viaje)}
                            >
                                <TableCell>{viaje.flota}</TableCell>
                                <TableCell>{viaje.finalizado ? viaje.gasto_total : '-'}</TableCell>
                                <TableCell>{viaje.finalizado ? viaje.pesca_total : '-'}</TableCell>
                                <TableCell>
                                    {viaje.finalizado ? 'Finalizado' : <Alert severity="warning">Viaje no finalizado</Alert>}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color={viaje.finalizado ? 'primary' : 'secondary'}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita la selección al hacer clic en el botón
                                            handleRowClick(viaje);
                                        }}
                                    >
                                        Ver detalles
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal o sección de detalles del viaje seleccionado */}
            {viajeSeleccionado && (
                <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Detalles del Viaje - {viajeSeleccionado.flota}</h3>
                    {viajeSeleccionado.finalizado ? (
                        <>
                            <p>Gasto Total: {viajeSeleccionado.gasto_total}</p>
                            <p>Pesca Total: {viajeSeleccionado.pesca_total}</p>
                        </>
                    ) : (
                        <Alert severity="warning">Este viaje aún no ha sido finalizado. Puedes agregar datos adicionales antes de finalizar.</Alert>
                    )}
                    {/* Botones para agregar información o finalizar */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log('Agregar datos de pesca o gastos')} // Lógica para agregar datos
                        style={{ marginRight: '10px' }}
                    >
                        Agregar Datos
                    </Button>
                    {!viajeSeleccionado.finalizado && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => console.log('Finalizar viaje')} // Lógica para finalizar el viaje
                        >
                            Finalizar Viaje
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};
