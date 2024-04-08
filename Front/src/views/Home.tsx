import { useEffect, useState } from "react";
import { Film, fetchFilmByTitle, selectSingleFilm } from "../redux/films/filmsSlice";
import { People, fetchPeopleByName, selectSinglePeople } from "../redux/people/peopleSlice";
import { Planet, fetchPlanetByName, selectSinglePlanet } from "../redux/planets/planetsSlice";
import { Starship } from "../redux/starships/starshipsSlice";
import { FilmCard } from "../components/cards/FilmCard";
import { GeneralCard } from "../components/cards/GeneralCard";
import { InfoDetail } from "./InfoDetail";
import { Select } from "../components/Select";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Loader } from "../components/loader/Loader";

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
    const dispatch = useAppDispatch();

    const filmByTitle: Film[] = useAppSelector((state) => selectSingleFilm(state)) as Film[];
    const peopleByName: People[] = useAppSelector((state) => selectSinglePeople(state)) as People[];
    const planetByName: Planet[] = useAppSelector((state) => selectSinglePlanet(state)) as Planet[];
    
    const [loading, setLoading] = useState(true);
    const [renderDetail, setRenderDetail] = useState(false);
    const [selectedItem, setSelectedItem] = useState< Film | People | Planet | Starship | null >(null);
    const [selectedOption, setSelectedOption] = useState<string | null>("Films");
    const [searchTitle, setSearchTitle] = useState<string>("");
    const [searchName, setSearchName] = useState<string>("");

    const handleClick = (item: Film | People | Planet | Starship) => {
        setSelectedItem(item);
        setRenderDetail(true);
    };

    const handleBack = () => {
        setSelectedItem(null);
        setSelectedOption("Films");
        setRenderDetail(false);
    };
    
    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const handleInputTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(event.target.value);
    };
    const handleInputNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedOption === "Films") {
            try {
                setLoading(true)
                await dispatch(fetchFilmByTitle(searchTitle));
            } catch (error) {
                console.error("Error al buscar película por título:", error);
            }
        } else  if (selectedOption === "People") {
            try {
                setLoading(true)
                await dispatch(fetchPeopleByName(searchName));
            } catch (error) {
                console.error("Error al buscar personas por nombre:", error);
            }
        } else  if (selectedOption === "Planets") {
            try {
                setLoading(true)
                await dispatch(fetchPlanetByName(searchName));
            } catch (error) {
                console.error("Error al buscar planetas por nombre:", error);
            }
        }
    };

    useEffect(() => {
       
    if( films.length > 0 || people.length > 0 || planets.length > 0 || starships.length > 0){
        setLoading(false)
    } else if(filmByTitle || peopleByName || planetByName){
        setLoading(false)
    }
      }, [dispatch, films, people, planets, starships,filmByTitle, peopleByName, planetByName,]);

    let componentToRender;
    const options = ["Films", "People", "Planets", "Starships"];

    if (loading) {
        componentToRender = (
            <div className="h-[80vh] flex items-center justify-center">
                <Loader/>
            </div>
        );
    } else if (selectedOption === "Films") {
        componentToRender = (
            <div className="h-full">
                {filmByTitle ? (
                    // Si filmByTitle no es nulo, mapea filmByTitle en lugar de films
                    filmByTitle.map((film, index) => (
                        <FilmCard
                            key={index}
                            film={film}
                            onClick={() => handleClick(film)}
                        />
                    ))
                ) : (
                    // Si filmByTitle es nulo, mapea films como antes
                    films.length > 0 ? (
                        films.map((film, index) => (
                            <FilmCard
                                key={index}
                                film={film}
                                onClick={() => handleClick(film)}
                            />
                        ))
                    ) : (
                        <div>No hay películas disponibles</div>
                    )
                )}
            </div>
        );
    } else if (selectedOption === "People") {
        componentToRender = (
            <div className="h-full">
                {peopleByName ? (
                    // Si peopleByName no es nulo, mapea peopleByName en lugar de people
                    peopleByName.map((person, index) => (
                        <GeneralCard
                            key={index}
                            people={person}
                            onClick={() => handleClick(person)}
                        />
                    ))
                ) : (
                    // Si peopleByName es nulo, mapea people como antes
                    people.length > 0 ? (
                        people.map((people, index) => (
                            <GeneralCard
                                key={index}
                                people={people}
                                onClick={() => handleClick(people)}
                            />
                        ))
                    ) : (
                        <div>No hay personas disponibles</div>
                    )
                )}
            </div>
        );
    } else if (selectedOption === "Planets") {
        componentToRender = (
            <div className="h-full">
                {planetByName ? (
                    // Si planetByName no es nulo, mapea planetByName en lugar de planet
                    planetByName.map((planet, index) => (
                        <GeneralCard
                            key={index}
                            planet={planet}
                            onClick={() => handleClick(planet)}
                        />
                    ))
                ) : (
                    // Si planetByName es nulo, mapea planets como antes
                    planets.length > 0 ? (
                        planets.map((planet, index) => (
                            <GeneralCard
                                key={index}
                                planet={planet}
                                onClick={() => handleClick(planet)}
                            />
                        ))
                    ) : (
                        <div>No hay planetas disponibles</div>
                    )
                )}
            </div>
        );
    } else if (selectedOption === "Starships") {
        componentToRender = (
            <div className="h-full">
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
            </div>
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
                    <div className="h-[5rem] flex justify-around items-center bg-black">
                        <Select options={options} onChange={handleOptionChange} />
                        {selectedOption === "Films" && (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={searchTitle}
                                    onChange={handleInputTitleChange}
                                    className="h-[2rem] w-[15rem] rounded-sm px-2"
                                    placeholder="Buscar por título"
                                />
                                <button type="submit" className="bg-yellow-300 h-[2rem] w-[5rem] px-2 ml-2 rounded-sm">Buscar</button>
                            </form>
                        )}
                        {selectedOption === "People" && (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={searchName}
                                    onChange={handleInputNameChange}
                                    className="h-[2rem] w-[15rem] rounded-sm px-2"
                                    placeholder="Buscar por nombre"
                                />
                                <button type="submit" className="bg-yellow-300 h-[2rem] w-[5rem] px-2 ml-2  rounded-sm">Buscar</button>
                            </form>
                        )}
                        {selectedOption === "Planets" && (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={searchName}
                                    onChange={handleInputNameChange}
                                    className="h-[2rem] w-[15rem] rounded-sm px-2"
                                    placeholder="Buscar por nombre"
                                />
                                <button type="submit" className="bg-yellow-300 h-[2rem] w-[5rem] px-2 ml-2  rounded-sm">Buscar</button>
                            </form>
                        )}
                    </div>
                    <div className="min-h-[100vh] w-full flex flex-col items-center bg-yellow-300 pt-5">
                        {componentToRender}
                    </div>
                </>
            )}
        </div>
    );
}
