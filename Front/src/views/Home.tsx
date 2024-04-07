import { useEffect, useState } from "react";
import { Film } from "../redux/films/filmsSlice";
import { People } from "../redux/people/peopleSlice";
import { Planet } from "../redux/planets/planetsSlice";
import { Starship } from "../redux/starships/starshipsSlice";
import { FilmCard } from "../components/cards/FilmCard";
import { GeneralCard } from "../components/cards/GeneralCard";
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
    const [selectedItem, setSelectedItem] = useState< Film | People | Planet | Starship | null >(null);
    const [selectedOption, setSelectedOption] = useState<string | null>("Films");

    const handleClick = (item: Film | People | Planet | Starship) => {
        setSelectedItem(item);
        setRenderDetail(true);
    };

    const handleBack = () => {
        setSelectedItem(null);
        setRenderDetail(false);
    };
    
    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    let componentToRender;

    if (selectedOption === "Films") {
        componentToRender = (
            <>
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
            </>
        );
    } else if (selectedOption === "People") {
        componentToRender = (
            <>
                {people.length > 0 ? (
                    people.map((people, index) => (
                        <GeneralCard
                            key={index}
                            people={people}
                            onClick={() => handleClick(people)}
                        />
                    ))
                ) : (
                    <div>No hay personas disponibles</div>
                )}
            </>
        );
    } else if (selectedOption === "Planets") {
        componentToRender = (
            <>
                {planets.length > 0 ? (
                    planets.map((planet, index) => (
                        <GeneralCard
                            key={index}
                            planet={planet}
                            onClick={() => handleClick(planet)}
                        />
                    ))
                ) : (
                    <div>No hay planetas disponibles</div>
                )}
            </>
        );
    } else if (selectedOption === "Starships") {
        componentToRender = (
            <>
                {starships.length > 0 ? (
                    starships.map((starship, index) => (
                        <GeneralCard
                            key={index}
                            starship={starship}
                            onClick={() => handleClick(starship)}
                        />
                    ))
                ) : (
                    <div>No hay naves espaciales disponibles</div>
                )}
            </>
        );
    }

    return (
        <div className="h-full w-full">
            {renderDetail ? (
                <InfoDetail
                    selectedItem={selectedItem}
                    onClick={() => handleBack()}
                />
            ) : (
                <>
                    <div className="h-[5rem] mb-5 flex justify-evenly items-center bg-blue-100">
                        <select
                            onChange={(e) => handleOptionChange(e.target.value)}
                        >
                            <option value="Films">Films</option>
                            <option value="People">People</option>
                            <option value="Planets">Planets</option>
                            <option value="Starships">Starships</option>
                        </select>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        {componentToRender}
                    </div>
                </>
            )}
        </div>
    );
}
