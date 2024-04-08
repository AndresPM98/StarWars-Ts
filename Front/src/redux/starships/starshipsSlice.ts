import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios'; 

export interface Starship {
        name: string;
        model: string;
        manufacturer: string;
        cost_in_credits: string;
        length: string;
        max_atmosphering_speed: string;
        crew: string;
        passengers: string;
        cargo_capacity: string;
        consumables: string;
        hyperdrive_rating: string;
        MGLT: string;
        starship_class: string;
        pilots: string[];
        films: string[];
        created: string;
        edited: string;
        url: string;
    }

const initialState: Starship[] = [];

export const fetchStarships = createAsyncThunk(
  'starships/fetchStarships',
  async () => {
    const response = await axios.get('http://localhost:8000/starships');
    return response.data.data.results; 
  }
);

const starshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStarships.fulfilled, (state, action) => {
      // Actualiza el estado con los datos de la respuesta
      return action.payload;
    });
  },
});

// Exporta acciones y el reducer
export const starshipsActions = starshipsSlice.actions;
export default starshipsSlice.reducer;

// Define selectores 
export const selectStarships = (state: RootState) => state.starships;
