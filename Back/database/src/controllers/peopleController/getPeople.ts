import axios from "axios";
import { Request, Response } from "express";
import People from "../../models/people";

export async function fetchAndSavePeople(
    req: Request,
    res: Response
): Promise<void> {
    try {
        // Verificar si existen personas en la base de datos
        const peopleInDB = await People.find();
        if (peopleInDB.length > 0) {
            // Si existen personas en la base de datos las devuelve como respuesta
            res.json(peopleInDB);
            return; 
        }

        // Si no hay personas en la base de datos, hacer una solicitud a la API de Star Wars para obtenerlas
        const response = await axios.get("https://swapi.dev/api/people/");
        const peopleData = response.data.results;

        // Función auxiliar para completar los valores faltantes con "n/a"
        const completeWithNA = (value: any) => (value ? value : "n/a");

        // Guardar las personas en la base de datos
        const savedPeople = await Promise.all(
            peopleData.map(async (person: any) => {
                // Crear una nueva instancia del modelo People con los datos de la API
                const newPerson = new People({
                    name: person.name,
                    height: completeWithNA(person.height),
                    mass: completeWithNA(person.mass),
                    hair_color: completeWithNA(person.hair_color),
                    skin_color: completeWithNA(person.skin_color),
                    eye_color: completeWithNA(person.eye_color),
                    birth_year: completeWithNA(person.birth_year),
                    gender: completeWithNA(person.gender),
                    homeworld: completeWithNA(person.homeworld),
                    films: completeWithNA(person.films),
                    species: completeWithNA(person.species),
                    vehicles: completeWithNA(person.vehicles),
                    starships: completeWithNA(person.starships),
                    created: new Date(person.created),
                    edited: new Date(person.edited),
                    url: completeWithNA(person.url),
                    // Agregar otros campos necesarios aquí
                });

                // Guardar el nuevo personaje en la base de datos
                return newPerson.save();
            })
        );

        res.json(savedPeople); // Responder con las personas guardadas con éxito
    } catch (error: any) {
        // Especifica el tipo de la variable error como any
        res.status(500).json({ message: error.message });
    }
}
