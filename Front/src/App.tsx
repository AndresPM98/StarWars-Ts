import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchFilms, selectFilms } from './redux/films/filmsSlice';
import { fetchPeople, selectPeople } from './redux/people/peopleSlice';
import { fetchPlanets, selectPlanets } from './redux/planets/planetsSlice';
import { fetchStarships, selectStarships } from './redux/starships/starshipsSlice';

function App() {
  const dispatch = useAppDispatch();
  const films = useAppSelector(selectFilms);
  const people = useAppSelector(selectPeople); 
  const planets = useAppSelector(selectPlanets); 
  const starships = useAppSelector(selectStarships); 

  useEffect(() => {
    // Dispara la acción para cargar los films y las personas cuando el componente se monta
    dispatch(fetchFilms());
    dispatch(fetchPeople());
    dispatch(fetchPlanets());
    dispatch(fetchStarships());
  }, [dispatch]);


  return (
    <>
      <h1 className="bg-red-500">Hola</h1>
    </>
  );
}

export default App
