import { Router } from 'express';
export class ViajeRouter {
    private static router = Router();
    static getRouter(): Router {
        this.router.get("/", (req, res) => {
            res.json({ message: "Obtener todos los Viajes" });
        }
        );
        this.router.post("/", (req, res) => {
            res.json({ message: "Crear Viaje" });
        }
        );
        this.router.put("/:id", (req, res) => {
            res.json({ message: "Actualizar Viaje" });
        }
        );
        this.router.delete("/:id", (req, res) => {
            res.json({ message: "Eliminar Viaje" });
        }
        );
        this.router.get("/:id", (req, res) => {
            res.json({ message: "Obtener Viaje por Id" });
        }
        );
        this.router.get("/flota/:id", (req, res) => {
            res.json({ message: "Obtener  Viajes por Flota id" });
        }
        );

        
        return this.router;
    }
}
