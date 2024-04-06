import Home from "./views/Home";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchFilms, selectFilms, Film } from "./redux/films/filmsSlice";
import { fetchPeople, selectPeople, People } from "./redux/people/peopleSlice";
import { fetchPlanets, selectPlanets, Planet } from "./redux/planets/planetsSlice";
import { fetchStarships, selectStarships, Starship } from "./redux/starships/starshipsSlice";

function App() {

const dispatch = useAppDispatch();
const films: Film[] = useAppSelector((state) => selectFilms(state)) as Film[];
const people: People[] = useAppSelector((state)=> selectPeople(state)) as People[];
const planets: Planet[] = useAppSelector((state)=> selectPlanets(state)) as Planet[] ;
const starships: Starship[] = useAppSelector((state)=> selectStarships(state)) as Starship[];

useEffect(() => {
    // Dispara la acción para cargar los films y las personas cuando el componente se monta
    dispatch(fetchFilms());
    dispatch(fetchPeople());
    dispatch(fetchPlanets());
    dispatch(fetchStarships());
}, [dispatch]);

  return (
    <div className="h-[100dvh] w-[100dvw] bg-blue-100">
      <Home films={films} people={people} planets={planets} starships={starships}/>
    </div>
  );
}

export default App
