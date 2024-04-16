import { Film } from "../../../redux/films/filmsSlice";
import { People } from "../../../redux/people/peopleSlice";
import { Planet } from "../../../redux/planets/planetsSlice";
import { Starship } from "../../../redux/starships/starshipsSlice";
import styles from "./InfoDetail.module.css";

interface InfoDetailProps {
    selectedItem: Film | People | Planet | Starship | null;
    onClick: () => void;
}

export function InfoDetail({ selectedItem, onClick }: InfoDetailProps) {
    return (
        <div className={styles.container}>
            <div className="h-[10%]">
                <button onClick={onClick} className={styles.button}>Volver</button>
            </div>
            
            <div className={styles.detailContainer}>
                {selectedItem ? (
                    <>
                        {("title" in selectedItem) && (
                            <>
                                <h1 className={styles.title}>{selectedItem.title}</h1>
                                <h2 className={styles.director}>{selectedItem.director}</h2>
                                <h3 className={styles.producer}>{selectedItem.producer}</h3>
                                <p className={styles.crawl}>{selectedItem.openingCrawl}</p>
                            </>
                        )}
                        {("name" in selectedItem) && (
                            <>
                                <h1 className={styles.title}>{selectedItem.name}</h1>
                            </>
                        )}
                    </>
                ) : (
                    <div>No hay detalle seleccionado</div>
                )}
            </div>
        </div>
    );
}
