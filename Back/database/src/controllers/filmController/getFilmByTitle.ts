/* import { Request, Response } from "express";
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
} */
import { Request, Response } from "express";
import Film from "../../models/film";

export async function getFilmByTitle(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const title = req.params.title;
        // Utilizar una expresión regular para buscar coincidencias parciales del título
        const films = await Film.find({ title: { $regex: title, $options: "i" } });

        if (!films || films.length === 0) {
            // Si no se encuentra ninguna película, devolver un mensaje de error
            res.status(404).json({ message: "No films found with that title" });
            return;
        }

        // Si se encuentran películas, devolverlas como respuesta
        res.json(films);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

