import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from './films/filmsSlice'; 
import peopleSlice from './people/peopleSlice';
import planetsSlice from './planets/planetsSlice';
import starshipsSlice from './starships/starshipsSlice';

const store = configureStore({
  reducer: {
    films: filmsReducer,
    people: peopleSlice,
    planets: planetsSlice,
    starships: starshipsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 