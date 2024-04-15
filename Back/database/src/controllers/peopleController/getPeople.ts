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
            // Si existen personas en la base de datos, responder con ellas
            res.json(peopleInDB);
            return; // Salir de la función
        }

        // Si no hay personas en la base de datos, hacer una solicitud a la API de Star Wars para obtenerlas
        const response = await axios.get("https://swapi.dev/api/people/");
        const peopleData = response.data.results;

        // Guardar las personas en la base de datos
        const savedPeople = await Promise.all(
            peopleData.map(async (person: any) => {
                // Verificar si los campos requeridos están presentes en los datos
                if (
                    !person.birth_year ||
                    !person.eye_color ||
                    !person.skin_color ||
                    !person.hair_color ||
                    !person.mass ||
                    !person.height ||
                    !person.gender ||
                    !person.homeworld ||
                    !person.films ||
                    !person.species ||
                    !person.vehicles ||
                    !person.starships ||
                    !person.created ||
                    !person.edited ||
                    !person.url
                ) {
                    // Si falta alguno de los campos requeridos, omitir este personaje
                    console.log(
                        `Personaje omitido debido a datos incompletos: ${person.name}`
                    );
                    return null;
                }

                // Crear una nueva instancia del modelo People con los datos de la API
                const newPerson = new People({
                    name: person.name,
                    height: person.height,
                    mass: person.mass,
                    hair_color: person.hair_color,
                    skin_color: person.skin_color,
                    eye_color: person.eye_color,
                    birth_year: person.birth_year,
                    gender: person.gender,
                    homeworld: person.homeworld,
                    films: person.films,
                    species: person.species,
                    vehicles: person.vehicles,
                    starships: person.starships,
                    created: new Date(person.created),
                    edited: new Date(person.edited),
                    url: person.url,
                    // Agregar otros campos necesarios aquí
                });

                // Guardar el nuevo personaje en la base de datos
                return newPerson.save();
            })
        );

        // Filtrar las personas guardadas con éxito y eliminar las entradas nulas
        const filteredPeople = savedPeople.filter((person) => person !== null);

        res.json(filteredPeople); // Responder con las personas guardadas con éxito
    } catch (error: any) {
        // Especifica el tipo de la variable error como any
        res.status(500).json({ message: error.message });
    }
}
