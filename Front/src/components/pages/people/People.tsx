import { useEffect, useState } from "react";
import {
    People,
    fetchPeopleByName,
    selectFilterPeople,
} from "../../../redux/people/peopleSlice";
import { GeneralCard } from "../../molecules/cards/GeneralCard";
import { InfoDetail } from "../infoDetail/InfoDetail";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Loader } from "../../atoms/loader/Loader";
import styles from "../../../styles/Page.module.css";

export const Characters = ({ people }: { people: People[] }) => {
    const dispatch = useAppDispatch();

    const peopleByName: People[] = useAppSelector((state) =>
        selectFilterPeople(state)
    ) as People[];

    const [loading, setLoading] = useState(true);
    const [renderDetail, setRenderDetail] = useState(false);
    const [selectedItem, setSelectedItem] = useState<People | null>(null);
    const [searchName, setSearchName] = useState<string>("");

    const handleClick = (item: People) => {
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
            await dispatch(fetchPeopleByName(searchName));
        } catch (error) {
            console.error("Error al buscar personas por nombre:", error);
        }
    };

    useEffect(() => {
        if (people.length > 0) {
            setLoading(false);
        } else if (peopleByName) {
            setLoading(false);
        }
    }, [dispatch, people, peopleByName]);

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
                                {peopleByName ? (
                                    peopleByName.map((people, index) => (
                                        <div
                                            key={index}
                                            className={styles.contentItem}
                                        >
                                            <GeneralCard
                                                key={index}
                                                people={people}
                                                onClick={() =>
                                                    handleClick(people)
                                                }
                                            />
                                        </div>
                                    ))
                                ) : people.length > 0 ? (
                                    people.map((people, index) => (
                                        <div
                                            key={index}
                                            className={styles.contentItem}
                                        >
                                            <GeneralCard
                                                key={index}
                                                people={people}
                                                onClick={() =>
                                                    handleClick(people)
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
