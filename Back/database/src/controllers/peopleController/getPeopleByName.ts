import { Request, Response } from "express";
import People from "../../models/people";

export async function getPeopleByName(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const name = req.params.name;
        // Buscar la película por título en la base de datos
        const people = await People.findOne({ name });

        if (!people) {
            // Si la película no se encuentra, devolver un mensaje de error
            res.status(404).json({ message: "Persona no encontrada" });
            return;
        }

        // Si se encuentra la película, devolverla como respuesta
        res.json(people);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
