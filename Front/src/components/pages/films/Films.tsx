import { useEffect, useState } from "react";
import {
    Film,
    fetchFilmByTitle,
    selectFilterFilms,
} from "../../../redux/films/filmsSlice";
import { FilmCard } from "../../molecules/cards/FilmCard";
import { InfoDetail } from "../infoDetail/InfoDetail";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Loader } from "../../atoms/loader/Loader";
import styles from "../../../styles/Page.module.css";

export const Films = ({ films }: { films: Film[] }) => {
    const dispatch = useAppDispatch();

    const filmByTitle: Film[] = useAppSelector((state) =>
        selectFilterFilms(state)
    ) as Film[];

    const [loading, setLoading] = useState(true);
    const [renderDetail, setRenderDetail] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Film | null>(null);
    const [searchTitle, setSearchTitle] = useState<string>("");

    const handleClick = (item: Film) => {
        setSelectedItem(item);
        setRenderDetail(true);
    };

    const handleBack = () => {
        setSelectedItem(null);
        setRenderDetail(false);
    };

    const handleInputTitleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchTitle(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            await dispatch(fetchFilmByTitle(searchTitle));
        } catch (error) {
            console.error("Error al buscar película por título:", error);
        }
    };

    useEffect(() => {
        if (films.length > 0) {
            setLoading(false);
        } else if (filmByTitle) {
            setLoading(false);
        }
    }, [dispatch, films, filmByTitle]);

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
                    </div>
                    <div className={styles.content}>
                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <Loader />
                            </div>
                        ) : (
                            <div className={styles.content}>
                                {filmByTitle ? (
                                    filmByTitle.map((film, index) => (
                                        <div key={index} className={styles.contentItem}>
                                        <FilmCard
                                            key={index}
                                            film={film}
                                            onClick={() => handleClick(film)}
                                        />
                                        </div>
                                    ))
                                ) : films.length > 0 ? (
                                    films.map((film, index) => (
                                        <div key={index} className={styles.contentItem}>
                                        <FilmCard
                                            key={index}
                                            film={film}
                                            onClick={() => handleClick(film)}
                                        />
                                        </div>
                                    ))
                                ) : (
                                    <div>No hay películas disponibles</div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
