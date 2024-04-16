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

    interface StarshipsState {
      allStarships: Starship[];
      singleStarship: Starship | null;
    }
    
    const initialState: StarshipsState = {
      allStarships: [],
      singleStarship: null,
    };
    
    export const fetchStarships = createAsyncThunk(
      'starships/fetchStarships',
      async () => {
        const response = await axios.get('http://localhost:8000/starships');
        return response.data.data; 
      }
    );
    
    // Define la acción asincrónica para obtener un starshipa por su nombre
    export const fetchStarshipByName = createAsyncThunk(
      'starships/fetchStarshipByName',
      async (name: string) => {
        const response = await axios.get(`http://localhost:8000/starships/${encodeURIComponent(name)}`);
        return response.data.data; 
      }
    );
    
    const starshipsSlice = createSlice({
      name: 'starships',
      initialState,
      reducers: {
      },
      extraReducers: (builder) => {
        builder
        .addCase(fetchStarships.fulfilled, (state, action) => {
          // Actualiza el estado con los datos de la respuesta
          state.allStarships = action.payload;
        })
        .addCase(fetchStarshipByName.fulfilled, (state, action) => {
          state.singleStarship = action.payload;
        });
      },
    });
    
    // Exporta acciones y el reducer
    export const starshipsActions = starshipsSlice.actions;
    export default starshipsSlice.reducer;
    
    // Define selectores 
    export const selectStarships = (state: RootState) => state.starships.allStarships;
    export const selectSingleStarship = (state: RootState) => state.starships.singleStarship;
    