import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Routes, Route } from 'react-router-dom'; 
import { fetchAllFilms, selectAllFilms, Film } from "./redux/films/filmsSlice";
import { fetchPeople, selectPeople, People } from "./redux/people/peopleSlice";
import { fetchPlanets, selectPlanets, Planet } from "./redux/planets/planetsSlice";
import { fetchStarships, selectStarships, Starship } from "./redux/starships/starshipsSlice";
import { Loader } from "./components/atoms/loader/Loader";
import StarWarsImg from "../src/assets/starwars.jpeg";
import { Films, Characters, Planets, Starships } from "./components/pages";
import styles from "./App.module.css";
import Navbar from "./components/organisms/navbar/Navbar";

function App() {
    const dispatch = useAppDispatch();

    // Estados para controlar el estado de carga
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const films: Film[] = useAppSelector((state) => selectAllFilms(state)) as Film[];
    const people: People[] = useAppSelector((state) => selectPeople(state)) as People[];
    const planets: Planet[] = useAppSelector((state) => selectPlanets(state)) as Planet[];
    const starships: Starship[] = useAppSelector((state) => selectStarships(state)) as Starship[];

    useEffect(() => {
        // Función para cargar todos los datos necesarios
        const fetchData = async () => {
            try {
                // Dispara las acciones para cargar los films, personas, planetas y starships
                await dispatch(fetchAllFilms());
                await dispatch(fetchPeople());
                await dispatch(fetchPlanets());
                await dispatch(fetchStarships());
                // Una vez cargados todos los datos, establece loading en falso
                setLoading(false);
            } catch (error: any) {
                // Si hay algún error, establece el estado de error
                setError(error.message);
            }
        };

        fetchData();
    }, [dispatch]);

    // Si hay un error, muestra un mensaje de error
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Si loading es true, muestra el componente de carga
    if (loading) {
        return (
            <div className={`${styles.container} ${styles.loaderBackground}`} style={{ backgroundImage: `url(${StarWarsImg})` }}>
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar/>
                <Routes>
                    <Route path="/" element={<Films films={films}  />} />
                    <Route path="/people" element={<Characters people={people} />} />
                    <Route path="/planets" element={<Planets planets={planets} />} />
                    <Route path="/starships" element={<Starships starships={starships}  />} />
                </Routes>
        </div>
    );
}

export default App;
