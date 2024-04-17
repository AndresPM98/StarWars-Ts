import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios'; 

export interface People {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

interface PeopleState {
  allPeople: People[];
  filterPeople: People | null;
}

const initialState: PeopleState = {
  allPeople: [],
  filterPeople: null,
};

export const fetchPeople = createAsyncThunk(
  'people/fetchPeople',
  async () => {
    const response = await axios.get('http://localhost:8000/people');
    return response.data.data; 
  }
);

export const fetchPeopleByName = createAsyncThunk(
  'people/fetchPeopleByName',
  async (name: string) => {
    const response = await axios.get(`http://localhost:8000/people/${encodeURIComponent(name)}`);
    return response.data.data;
  }
);

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchPeople.fulfilled, (state, action) => {
      // Actualiza el estado con los datos de la respuesta
      state.allPeople = action.payload;
    })
    .addCase(fetchPeopleByName.fulfilled, (state, action) => {
      state.filterPeople = action.payload;
    });
  },
});

// Exporta acciones y el reducer
export const peopleActions = peopleSlice.actions;
export default peopleSlice.reducer;

// Define selectores 
export const selectPeople = (state: RootState) => state.people.allPeople;
export const selectFilterPeople = (state: RootState) => state.people.filterPeople;

