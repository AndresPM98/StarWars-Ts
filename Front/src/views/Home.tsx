import { useEffect, useState } from "react";
import { Film } from "../redux/films/filmsSlice";
import { People } from "../redux/people/peopleSlice";
import { Planet } from "../redux/planets/planetsSlice";
import { Starship } from "../redux/starships/starshipsSlice";
import { FilmCard } from "../components/cards/FilmCard";
import { InfoDetail } from "./InfoDetail";

export function Home({
    films,
    people,
    planets,
    starships,
}: {
    films: Film[];
    people: People[];
    planets: Planet[];
    starships: Starship[];
}) {
    const [renderDetail, setRenderDetail] = useState(false);
    /* const [selectedItem, setSelectedItem] = useState<
        Film | People | Planet | Starship | null
    >(null); */
    const [selectedItem, setSelectedItem] = useState<
        Film | null
    >(null);
    console.log(selectedItem);

    const handleClick = (film: Film) => {
        setSelectedItem(film);
        setRenderDetail(true);
    };

    const handleBack = () => {
        setSelectedItem(null);
        setRenderDetail(false);
    };

    return (
        <div className="h-full w-full">
            {renderDetail ? (
                <>
                    <InfoDetail selectedItem={selectedItem} onClick={() => handleBack()}/>
                </>
            ) : (
                <>
                    <div className="h-[5rem] mb-5 flex justify-evenly items-center bg-blue-100">
                        <button>boton 1</button>
                        <button>boton 2</button>
                        <button>boton 3</button>
                        <button>boton 4</button>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        {films.length > 0 ? (
                            films.map((film, index) => (
                                <FilmCard
                                    key={index}
                                    film={film}
                                    onClick={() => handleClick(film)}
                                />
                            ))
                        ) : (
                            <div>No hay películas disponibles</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
