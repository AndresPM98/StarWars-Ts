import { Film } from "../redux/films/filmsSlice";
import { People } from "../redux/people/peopleSlice";
import { Planet } from "../redux/planets/planetsSlice";
import { Starship } from "../redux/starships/starshipsSlice";
import { FilmCard } from "../components/cards/FilmCard"

function Home({ films, people, planets, starships }: { films: Film[]; people: People[]; planets: Planet[]; starships: Starship[] }) {
    return (
        <>
            <div className="h-full w-full">
      {films.length > 0 ? (
        films.map((film, index) => (
          <FilmCard key={index} film={film} />
        ))
      ) : (
        <div>No hay películas disponibles</div>
      )}
    </div>
        </>
    );
}

export default Home;
