import { Film } from "../../redux/films/filmsSlice";
import styles from "./Cards.module.css";
import StarWars1 from "../../assets/starwars1.jpg";
import StarWars2 from "../../assets/starwars2.jpg";
import StarWars3 from "../../assets/starwars3.jpg";
import StarWars4 from "../../assets/starwars4.jpg";
import StarWars5 from "../../assets/starwars5.jpg";
import StarWars6 from "../../assets/starwars6.jpg";

interface FilmCardProps {
    film: Film;
    onClick: () => void;
}

const episodeImages: Record<string, string> = {
    'The Phantom Menace': StarWars1,
    'Attack of the Clones':  StarWars2,
    'Revenge of the Sith': StarWars3,
    'A New Hope': StarWars4,
    'The Empire Strikes Back': StarWars5,
    'Return of the Jedi': StarWars6,
};

export function FilmCard({ film, onClick }: FilmCardProps) {
    const episodeName = film?.title;
    const episodeImage = episodeImages[episodeName] || StarWars1;

    return (
        <div className={`${styles.filmCard} ${styles.hoverEffect}`} onClick={onClick}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={episodeImage} alt={`Star Wars Episode ${episodeName}`} />
            </div>
            <div>
                <h1 className={styles.title}>{film.title}</h1>
                <div className={styles.description}>{film.opening_crawl}</div>
            </div>
        </div>
    );
}
