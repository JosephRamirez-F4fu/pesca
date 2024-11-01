import { FlotaRepository } from "./repositories/FlotaRepository"
import { ObtenerFlotas } from "./../useCases/flota/obtenerFlotas"
import { useEffect,useState } from "react";
import { Flota } from "../domain/model";
export function App() {
  const flotaRepository = new FlotaRepository();
  const obtenerFlotas = new ObtenerFlotas(flotaRepository);
  const handleFlota = async () => {
    const flotas = await obtenerFlotas.execute();
    if(flotas) {
      console.log(flotas);
    }
    return flotas;
  }
  const [flota, setFlota] = useState<Flota[]>([]);
  useEffect(
    () => {
      handleFlota().then(setFlota);
    }, []
  )
  return (
    <div>
      <h1>Flotas</h1>
      <ul>
        {flota.map((flota) => (
          <li key={flota.id}>{flota.nombre}- {flota.titular}</li>
        ))}
      </ul>
    </div>
  );

}