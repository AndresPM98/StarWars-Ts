/* import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchFilms, selectFilms } from "../redux/films/filmsSlice";
import { fetchPeople, selectPeople } from "../redux/people/peopleSlice";
import { fetchPlanets, selectPlanets } from "../redux/planets/planetsSlice";
import { fetchStarships, selectStarships } from "../redux/starships/starshipsSlice";
 */
interface Film {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string;
    url: string;
}
interface People {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}
interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

interface Starship {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

function Home({ films, people, planets, starships }: { films: Film[]; people: People[]; planets: Planet[]; starships: Starship[] }) {
    return (
        <>
            <h1>
                {films.length > 0
                    ? films[0].title
                    : "No hay películas disponibles"}
            </h1>
            <h1>
                {people.length > 0
                    ? people[0].name
                    : "No hay personas disponibles"}
            </h1>
            <h1>
                {planets.length > 0
                    ? planets[0].name
                    : "No hay planetas disponibles"}
            </h1>
            <h1>
                {starships.length > 0
                    ? starships[0].name
                    : "No hay naves espaciales disponibles"}
            </h1>
        </>
    );
}

export default Home;
