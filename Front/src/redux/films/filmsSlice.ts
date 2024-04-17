import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios'; 

export interface Film {
  title: string;
  episodeId: number;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: Date;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: Date;
  edited: Date;
  url: string;
}

interface FilmsState {
    allFilms: Film[];
    filterFilms: Film | null;
}

const initialState: FilmsState = {
    allFilms: [],
    filterFilms: null,
};

export const fetchAllFilms = createAsyncThunk(
  'films/fetchAllFilms',
  async () => {
    const response = await axios.get('http://localhost:8000/films');
    console.log(response);
    
    return response.data.data; 
  }
);

export const fetchFilmByTitle = createAsyncThunk(
  'films/fetchFilmByTitle',
  async (title: string) => {
    const response = await axios.get(`http://localhost:8000/films/${encodeURIComponent(title)}`);
    console.log(response);
    
    return response.data.data; 
  }
);

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilms.fulfilled, (state, action) => {
        // Actualiza el estado con las películas obtenidas
        state.allFilms = action.payload;
      })
      .addCase(fetchFilmByTitle.fulfilled, (state, action) => {
        // Actualiza el estado con la película individual obtenida
        state.filterFilms = action.payload;
      });
  },
});

// Exporta acciones y el reducer
export const filmsActions = filmsSlice.actions;
export default filmsSlice.reducer;

// Define selectores
export const selectAllFilms = (state: RootState) => state.films.allFilms;
export const selectFilterFilms = (state: RootState) => state.films.filterFilms;
