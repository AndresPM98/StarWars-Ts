import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios'; 

export interface Film {
    _id: string;
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string; 
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string; 
    edited: string; 
    url: string;
}

interface FilmsState {
    allFilms: Film[];
    singleFilm: Film | null;
}

const initialState: FilmsState = {
    allFilms: [],
    singleFilm: null,
};

// Define la acción asincrónica para obtener todas las películas
export const fetchAllFilms = createAsyncThunk(
  'films/fetchAllFilms',
  async () => {
    const response = await axios.get('http://localhost:8000/films');
    return response.data.data; // Devuelve los datos de la respuesta
  }
);

// Define la acción asincrónica para obtener una película por su título
export const fetchFilmByTitle = createAsyncThunk(
  'films/fetchFilmByTitle',
  async (title: string) => {
    const response = await axios.get(`http://localhost:8000/films/${encodeURIComponent(title)}`);
    return response.data.data; // Devuelve los datos de la respuesta
  }
);

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    // Aquí puedes definir otras acciones síncronas si es necesario
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilms.fulfilled, (state, action) => {
        // Actualiza el estado con las películas obtenidas
        state.allFilms = action.payload;
      })
      .addCase(fetchFilmByTitle.fulfilled, (state, action) => {
        // Actualiza el estado con la película individual obtenida
        state.singleFilm = action.payload;
      });
  },
});

// Exporta tus acciones y el reducer
export const filmsActions = filmsSlice.actions;
export default filmsSlice.reducer;

// Define tus selectores aquí si los necesitas
export const selectAllFilms = (state: RootState) => state.films.allFilms;
export const selectSingleFilm = (state: RootState) => state.films.singleFilm;
