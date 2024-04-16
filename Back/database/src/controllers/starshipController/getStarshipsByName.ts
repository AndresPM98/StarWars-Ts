import { Request, Response } from "express";
import Starship from "../../models/starship";

export async function getStarshipByName(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const name = req.params.name;
        // Buscar la película por título en la base de datos
        const starship = await Starship.find({ name: { $regex: name, $options: "i" } });

        if (!starship || starship.length === 0) {
            // Si la película no se encuentra, devolver un mensaje de error
            res.status(404).json({ message: "Nave no encontrada" });
            return;
        }

        // Si se encuentra la película, devolverla como respuesta
        res.json(starship);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
