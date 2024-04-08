import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios'; // Asegúrate de tener axios instalado

export interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

interface PlanetsState {
  allPlanets: Planet[];
  singlePlanet: Planet | null;
}

const initialState: PlanetsState = {
  allPlanets: [],
  singlePlanet: null,
};

// Define la acción asincrónica para hacer la solicitud HTTP
export const fetchPlanets = createAsyncThunk(
  'planets/fetchPlanets',
  async () => {
    const response = await axios.get('http://localhost:8000/planets');
    return response.data.data; // Devuelve los datos de la respuesta
  }
);

// Define la acción asincrónica para obtener un planeta por su nombre
export const fetchPlanetByName = createAsyncThunk(
  'planets/fetchPlanetByName',
  async (name: string) => {
    const response = await axios.get(`http://localhost:8000/planets/${encodeURIComponent(name)}`);
    return response.data.data; // Devuelve los datos de la respuesta
  }
);

const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    // Aquí puedes definir otras acciones síncronas si es necesario
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchPlanets.fulfilled, (state, action) => {
      // Actualiza el estado con los datos de la respuesta
      state.allPlanets = action.payload;
    })
    .addCase(fetchPlanetByName.fulfilled, (state, action) => {
      // Actualiza el estado con la película individual obtenida
      state.singlePlanet = action.payload;
    });
  },
});

// Exporta tus acciones y el reducer
export const planetsActions = planetsSlice.actions;
export default planetsSlice.reducer;

// Define tus selectores aquí si los necesitas
export const selectPlanets = (state: RootState) => state.planets.allPlanets;
export const selectSinglePlanet = (state: RootState) => state.planets.singlePlanet;

