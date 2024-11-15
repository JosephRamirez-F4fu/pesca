import { Flota } from "@/models";
import { FlotaCard } from "@/components";

interface FlotaListProps {
  flotas: Flota[];
  onClick: (flota: Flota) => void;
}

export const FlotaList = ({ flotas, onClick }: FlotaListProps) => {
  return (
    <div className="flex gap-5 items-center justify-center">
      {flotas.map((flota) => (
        <div
          key={flota.id}
          onClick={() => onClick(flota)}
          style={{
            cursor: "pointer",
          }}
        >
          <FlotaCard flota={flota} />
        </div>
      ))}
    </div>
  );
};
