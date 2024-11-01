import { Flota } from "../../domain/model";

interface FlotaSelectorProps {
    flotas: Flota[];
    onSelect: (flota: Flota) => void;
}

export const SelectorFlotaComponent = ({ flotas, onSelect }: FlotaSelectorProps) => {
    return (
        <div>
            <label>Selecciona Flota:</label>
        <select onChange={(e) => onSelect(flotas.find((flota) => flota.id === parseInt(e.target.value)) as Flota)}>
            {flotas.map((flota) => (
                <option key={flota.id} value={flota.id}>{flota.nombre} {flota.titular} </option>
            ))}
        </select>
        </div>
    );
};