import { Request, Response } from "express";
import Planet from "../../models/planet";

export async function getPlanetByName(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const name = req.params.name;
        // Buscar la película por título en la base de datos
        const planet = await Planet.findOne({ name });

        if (!planet) {
            // Si la película no se encuentra, devolver un mensaje de error
            res.status(404).json({ message: "Planeta no encontrado" });
            return;
        }

        // Si se encuentra la película, devolverla como respuesta
        res.json(planet);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
