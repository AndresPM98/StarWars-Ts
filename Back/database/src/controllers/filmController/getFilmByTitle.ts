import { Request, Response } from "express";
import Film from "../../models/film";

export async function getFilmByTitle(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const title = req.params.title;
        // Buscar la película por título en la base de datos
        const film = await Film.findOne({ title });

        if (!film) {
            // Si la película no se encuentra, devolver un mensaje de error
            res.status(404).json({ message: "Film not found" });
            return;
        }

        // Si se encuentra la película, devolverla como respuesta
        res.json(film);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
