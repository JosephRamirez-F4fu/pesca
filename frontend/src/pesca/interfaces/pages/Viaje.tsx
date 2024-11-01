import React, { useState } from 'react';
import { Flota, Viaje,Pesca } from './../../domain/model';
import { GastosViaje } from './../../domain/model';
const mockFlota: Flota = {
    id:1,
    nombre: "Flota 1",
    titular: "Titular 1",
    capacidad: 10,
}
const mockViaje: Viaje = {
    id:1,
    flota_id: 1,
    petroleo_cargado:10,
    petroleo_consumido:5,
    petroleo_restante:5,
}
const mockGastos: GastosViaje[] = [
    {
        id:1,
        id_viaje: 1,
        concepto: "Concepto 1",
        importe: 100,
    },
    {
        id:2,
        id_viaje: 1,
        concepto: "Concepto 2",
        importe: 200,
    },
]
const mockPesca: Pesca[] = [
    {
        id:1,
        id_viaje: 1,
        pescado_cajas: 300,
        pescado_tipo:"Bonito",
        precio: 100,
    }
]
export function ViajePage(){
    const [flota, setFlota] = useState<Flota>(
        mockFlota
    );
    const [viaje,setViaje] = useState<Viaje>(
        mockViaje
    );
    const [gastos, setGastos] = useState<GastosViaje[]>(
        mockGastos
    );
    const [totalGastos, setTotalGastos] = useState<number>(
        gastos.reduce((acc, gasto) => acc + gasto.importe, 0)
    );
    const [pesca, setPesca] = useState<Pesca[]>(
        mockPesca
    );

    return (
        <div>
            <h1>Viaje</h1>
            <p>{flota?.nombre}</p>
            <p>{flota?.titular}</p>
            <p>{viaje?.petroleo_cargado}</p>
            <p>{viaje?.petroleo_consumido}</p>
            <p>{viaje?.petroleo_restante}</p>
            <h2>Gastos</h2>
            <p>{totalGastos}</p>
            <ul>
                {gastos.map(gasto => (
                    <li key={gasto.id}>
                        <p>{gasto.concepto}</p>
                        <p>{gasto.importe}</p>
                    </li>
                ))}
            </ul>
            <h2>Pesca</h2>
            <ul>
                {pesca.map(pesca => (
                    <li key={pesca.id}>
                        <p>{pesca.pescado_tipo}</p>
                        <p>{pesca.pescado_cajas}</p>
                        <p>{pesca.precio}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}