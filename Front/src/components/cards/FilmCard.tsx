import { Film } from "../../redux/films/filmsSlice";
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

const episodeImages: Record<number, string> = {
    1: StarWars1,
    2: StarWars2,
    3: StarWars3,
    4: StarWars4,
    5: StarWars5,
    6: StarWars6,
  };

export function FilmCard({ film, onClick }: FilmCardProps) {

    const episodeImage = episodeImages[film.episode_id] || StarWars1;

    return (
        <div className="w-[50rem] border rounded-md p-5 mb-5 flex cursor-pointer hover:transform hover:scale-105 hover: shadow-md" onClick={onClick}>
            <div className="mr-5">
                <img className="w-[800px] h-auto" src={episodeImage} alt={`Star Wars Episode ${film.episode_id}`} />
            </div>
            <div>
                <h1 className="text-lg font-bold">{film.title}</h1>
                <div className="text-md">{film.opening_crawl}</div>
            </div>
        </div>
    );
}
