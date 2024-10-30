import { Router } from "express";
export class PescaRouter {
    private static router = Router();
    static getRouter(): Router {
       
        this.router.get("/", (req, res) => {
            res.json({ message: "Obtener todos los Pesca" });
        }
        );
        this.router.post("/", (req, res) => {
            res.json({ message: "Crear Pesca" });
        }
        );
        this.router.put("/:id", (req, res) => {
            res.json({ message: "Actualizar Pesca" });
        }
        );
        this.router.delete("/:id", (req, res) => {
            res.json({ message: "Eliminar Pesca" });
        }
        );
        this.router.get("/:id", (req, res) => {
            res.json({ message: "Obtener Pesca por Id" });
        }
        );
        this.router.get("/viaje/:id", (req, res) => {
            res.json({ message: "Obtener  Pesca por Viaje id" });
        }
        );
        this.router.get("/flota/:id", (req, res) => {
            res.json({ message: "Obtener  Pesca por Flota id" });
        }
        );
        
        return this.router;
    }
}
