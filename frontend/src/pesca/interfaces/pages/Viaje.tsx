import { useState } from 'react';
import { ViajeSummary } from '@/pesca/domain/model';
import { Table, Button, Alert } from '@mui/material';

const viajes: ViajeSummary[] = [
    {
        finalizado: false,
        gasto_total: 100,
        id: 1,
        flota: 'Flota 1',
        pesca_total: 100,
    },
]

const onAddCombustible = (id: number) => {
    console.log('Agregar Combustible', id);
};

const onAddGasto = (id: number) => {
    console.log('Agregar Gasto', id);
};

const onAddPesca = (id: number) => {
    console.log('Agregar Pesca', id);
};

const onFinalizar = (id: number) => {
    console.log('Finalizar Viaje', id);
};



export const ViajePage = () => {
    return (
        <div>
            {viajes.map((viaje) => (
                <div key={viaje.id}>
                    {!viaje.finalizado && <Alert severity="warning">Viaje no finalizado</Alert>}
                    <Table>
                        <thead>
                            <tr>
                                <th>Flota</th>
                                <th>Galonaje Agregado</th>
                                <th>Galonaje Consumido</th>
                                <th>Galonaje Restante</th>
                                <th>Gastos</th>
                                <th>Pesca</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{viaje.flota}</td>
                                <td>{viaje.petroleo_cargado}</td>
                                <td>{viaje.petroleo_consumido}</td>
                                <td>{viaje.flota_capacidad - viaje.petroleo_consumido}</td>
                                <td>{viaje.gasto_total}</td>
                                <td>{viaje.pesca_total}</td>
                                
                                <td>
                                    {!viaje.finalizado && (
                                        <>
                                            <Button variant="contained" onClick={() => onAddCombustible(viaje.id)}>Agregar Combustible</Button>
                                            <Button variant="contained" onClick={() => onAddGasto(viaje.id)}>Agregar Gasto</Button>
                                            <Button variant="contained" onClick={() => onAddPesca(viaje.id)}>Agregar Pesca</Button>
                                            <Button variant="contained" onClick={() => onFinalizar(viaje.id)}>Finalizar Viaje</Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
        </div>
    );
};
