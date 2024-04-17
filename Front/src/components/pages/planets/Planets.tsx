import { useEffect, useState } from "react";
import {
    Planet,
    fetchPlanetByName,
    selectFilterPlanets,
} from "../../../redux/planets/planetsSlice";
import { GeneralCard } from "../../molecules/cards/GeneralCard";
import { InfoDetail } from "../infoDetail/InfoDetail";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Loader } from "../../atoms/loader/Loader";
import styles from "../../../styles/Page.module.css";

export const Planets = ({ planets }: { planets: Planet[] }) => {
    const dispatch = useAppDispatch();

    const planetsByName: Planet[] = useAppSelector((state) =>
        selectFilterPlanets(state)
    ) as Planet[];

    const [loading, setLoading] = useState(true);
    const [renderDetail, setRenderDetail] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Planet | null>(null);
    const [searchName, setSearchName] = useState<string>("");

    const handleClick = (item: Planet) => {
        setSelectedItem(item);
        setRenderDetail(true);
    };

    const handleBack = () => {
        setSelectedItem(null);
        setRenderDetail(false);
    };

    const handleInputNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            await dispatch(fetchPlanetByName(searchName));
        } catch (error) {
            console.error("Error al buscar personas por nombre:", error);
        }
    };

    useEffect(() => {
        if (planets.length > 0) {
            setLoading(false);
        } else if (planetsByName) {
            setLoading(false);
        }
    }, [dispatch, planets, planetsByName]);

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
                                value={searchName}
                                onChange={handleInputNameChange}
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
                                {planetsByName ? (
                                    planetsByName.map((planet, index) => (
                                        <div
                                            key={index}
                                            className={styles.contentItem}
                                        >
                                            <GeneralCard
                                                key={index}
                                                planet={planet}
                                                onClick={() =>
                                                    handleClick(planet)
                                                }
                                            />
                                        </div>
                                    ))
                                ) : planets.length > 0 ? (
                                    planets.map((planet, index) => (
                                        <div
                                            key={index}
                                            className={styles.contentItem}
                                        >
                                            <GeneralCard
                                                key={index}
                                                planet={planet}
                                                onClick={() =>
                                                    handleClick(planet)
                                                }
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div>No hay personajes disponibles</div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
