import { useEffect, useState } from "react";
import {
    Film,
    fetchFilmByTitle,
    selectSingleFilm,
} from "../../../redux/films/filmsSlice";
import {
    People,
    fetchPeopleByName,
    selectSinglePeople,
} from "../../../redux/people/peopleSlice";
import {
    Planet,
    fetchPlanetByName,
    selectSinglePlanet,
} from "../../../redux/planets/planetsSlice";
import {
    Starship,
    fetchStarshipByName,
    selectSingleStarship,
} from "../../../redux/starships/starshipsSlice";
import { FilmCard } from "../../molecules/cards/FilmCard";
import { GeneralCard } from "../../molecules/cards/GeneralCard";
import { InfoDetail } from "../infoDetail/InfoDetail";
import { Select } from "../../atoms/select/Select";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Loader } from "../../atoms/loader/Loader";
import styles from "./Home.module.css";

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

    const filmByTitle: Film[] = useAppSelector((state) =>
        selectSingleFilm(state)
    ) as Film[];
    const peopleByName: People[] = useAppSelector((state) =>
        selectSinglePeople(state)
    ) as People[];
    const planetByName: Planet[] = useAppSelector((state) =>
        selectSinglePlanet(state)
    ) as Planet[];
    const starshipByName: Starship[] = useAppSelector((state) =>
        selectSingleStarship(state)
    ) as Starship[];

    const [loading, setLoading] = useState(true);
    const [renderDetail, setRenderDetail] = useState(false);
    const [selectedItem, setSelectedItem] = useState<
        Film | People | Planet | Starship | null
    >(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(
        "Films"
    );
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

    const handleInputTitleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchTitle(event.target.value);
    };
    const handleInputNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedOption === "Films") {
            try {
                setLoading(true);
                await dispatch(fetchFilmByTitle(searchTitle));
            } catch (error) {
                console.error("Error al buscar película por título:", error);
            }
        } else if (selectedOption === "People") {
            try {
                setLoading(true);
                await dispatch(fetchPeopleByName(searchName));
            } catch (error) {
                console.error("Error al buscar personas por nombre:", error);
            }
        } else if (selectedOption === "Planets") {
            try {
                setLoading(true);
                await dispatch(fetchPlanetByName(searchName));
            } catch (error) {
                console.error("Error al buscar planetas por nombre:", error);
            }
        } else if (selectedOption === "Starships") {
            try {
                setLoading(true);
                await dispatch(fetchStarshipByName(searchName));
            } catch (error) {
                console.error("Error al buscar nave por nombre:", error);
            }
        }
    };

    useEffect(() => {
        if (
            films.length > 0 ||
            people.length > 0 ||
            planets.length > 0 ||
            starships.length > 0
        ) {
            setLoading(false);
        } else if (
            filmByTitle ||
            peopleByName ||
            planetByName ||
            starshipByName
        ) {
            setLoading(false);
        }
    }, [
        dispatch,
        films,
        people,
        planets,
        starships,
        filmByTitle,
        peopleByName,
        planetByName,
        starshipByName,
    ]);

    let componentToRender;
    const options = ["Films", "People", "Planets", "Starships"];

    if (loading) {
        componentToRender = (
            <div className={styles.loadingContainer}>
                <Loader />
            </div>
        );
    } else if (selectedOption === "Films") {
        componentToRender = (
            <div className={styles.content}>
                {filmByTitle ? (
                    filmByTitle.map((film, index) => (
                        <FilmCard
                            key={index}
                            film={film}
                            onClick={() => handleClick(film)}
                        />
                    ))
                ) : films.length > 0 ? (
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
        );
    } else if (selectedOption === "People") {
        componentToRender = (
            <div className={styles.content}>
                {peopleByName ? (
                    peopleByName.map((person, index) => (
                        <GeneralCard
                            key={index}
                            people={person}
                            onClick={() => handleClick(person)}
                        />
                    ))
                ) : people.length > 0 ? (
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
            </div>
        );
    } else if (selectedOption === "Planets") {
        componentToRender = (
            <div className={styles.content}>
                {planetByName ? (
                    planetByName.map((planet, index) => (
                        <GeneralCard
                            key={index}
                            planet={planet}
                            onClick={() => handleClick(planet)}
                        />
                    ))
                ) : planets.length > 0 ? (
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
            </div>
        );
    } else if (selectedOption === "Starships") {
        componentToRender = (
            <div className={styles.content}>
                {starshipByName ? (
                    starshipByName.map((starship, index) => (
                        <GeneralCard
                            key={index}
                            starship={starship}
                            onClick={() => handleClick(starship)}
                        />
                    ))
                ) : starships.length > 0 ? (
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
        <div className={styles.container}>
            {renderDetail ? (
                <InfoDetail
                    selectedItem={selectedItem}
                    onClick={() => handleBack()}
                />
            ) : (
                <>
                    <div className={styles.header}>
                        <Select
                            options={options}
                            onChange={handleOptionChange}
                        />
                        {selectedOption === "Films" && (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={searchTitle}
                                    onChange={handleInputTitleChange}
                                    className={styles.searchInput}
                                    placeholder="Buscar por título"
                                />
                                <button
                                    type="submit"
                                    className={styles.searchButton}
                                >
                                    Buscar
                                </button>
                            </form>
                        )}
                        {selectedOption === "People" && (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={searchName}
                                    onChange={handleInputNameChange}
                                    className={styles.searchInput}
                                    placeholder="Buscar por nombre"
                                />
                                <button
                                    type="submit"
                                    className={styles.searchButton}
                                >
                                    Buscar
                                </button>
                            </form>
                        )}
                        {selectedOption === "Planets" && (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={searchName}
                                    onChange={handleInputNameChange}
                                    className={styles.searchInput}
                                    placeholder="Buscar por nombre"
                                />
                                <button
                                    type="submit"
                                    className={styles.searchButton}
                                >
                                    Buscar
                                </button>
                            </form>
                        )}
                        {selectedOption === "Starships" && (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={searchName}
                                    onChange={handleInputNameChange}
                                    className={styles.searchInput}
                                    placeholder="Buscar por nombre"
                                />
                                <button
                                    type="submit"
                                    className={styles.searchButton}
                                >
                                    Buscar
                                </button>
                            </form>
                        )}
                    </div>
                    <div className={styles.content}>{componentToRender}</div>
                </>
            )}
        </div>
    );
}
