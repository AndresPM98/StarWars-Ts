import { useEffect, useState } from "react";
import {
    Starship,
    fetchStarshipByName,
    selectFilterStarships,
} from "../../../redux/starships/starshipsSlice";
import { GeneralCard } from "../../molecules/cards/GeneralCard";
import { InfoDetail } from "../infoDetail/InfoDetail";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Loader } from "../../atoms/loader/Loader";
import styles from "../../../styles/Page.module.css";

export const Starships = ({ starships }: { starships: Starship[] }) => {
    const dispatch = useAppDispatch();

    const starshipsByName: Starship[] = useAppSelector((state) =>
        selectFilterStarships(state)
    ) as Starship[];

    const [loading, setLoading] = useState(true);
    const [renderDetail, setRenderDetail] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Starship | null>(null);
    const [searchName, setSearchName] = useState<string>("");

    const handleClick = (item: Starship) => {
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
            await dispatch(fetchStarshipByName(searchName));
        } catch (error) {
            console.error("Error al buscar personas por nombre:", error);
        }
    };

    useEffect(() => {
        if (starships.length > 0) {
            setLoading(false);
        } else if (starshipsByName) {
            setLoading(false);
        }
    }, [dispatch, starships, starshipsByName]);

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
                                {starshipsByName ? (
                                    starshipsByName.map((starship, index) => (
                                        <div
                                            key={index}
                                            className={styles.contentItem}
                                        >
                                            <GeneralCard
                                                key={index}
                                                starship={starship}
                                                onClick={() =>
                                                    handleClick(starship)
                                                }
                                            />
                                        </div>
                                    ))
                                ) : starships.length > 0 ? (
                                    starships.map((starship, index) => (
                                        <div
                                            key={index}
                                            className={styles.contentItem}
                                        >
                                            <GeneralCard
                                                key={index}
                                                starship={starship}
                                                onClick={() =>
                                                    handleClick(starship)
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
