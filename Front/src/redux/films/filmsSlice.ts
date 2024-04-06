import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios'; // Asegúrate de tener axios instalado

export interface Film {
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

const initialState: Film[] = [];

// Define la acción asincrónica para hacer la solicitud HTTP
export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  async () => {
    const response = await axios.get('http://localhost:8000/films');
    return response.data.data.results; // Devuelve los datos de la respuesta
  }
);

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    // Aquí puedes definir otras acciones síncronas si es necesario
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      // Actualiza el estado con los datos de la respuesta
      return action.payload;
    });
  },
});

// Exporta tus acciones y el reducer
export const filmsActions = filmsSlice.actions;
export default filmsSlice.reducer;

// Define tus selectores aquí si los necesitas
export const selectFilms = (state: RootState) => state.films;
