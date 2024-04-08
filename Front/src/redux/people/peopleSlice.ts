import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios'; // Asegúrate de tener axios instalado

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
  singlePeople: People | null;
}

const initialState: PeopleState = {
  allPeople: [],
  singlePeople: null,
};

// Define la acción asincrónica para hacer la solicitud HTTP
export const fetchPeople = createAsyncThunk(
  'people/fetchPeople',
  async () => {
    const response = await axios.get('http://localhost:8000/people');
    return response.data.data; // Devuelve los datos de la respuesta
  }
);

// Define la acción asincrónica para obtener una persona por su nombre
export const fetchPeopleByName = createAsyncThunk(
  'people/fetchPeopleByName',
  async (name: string) => {
    const response = await axios.get(`http://localhost:8000/people/${encodeURIComponent(name)}`);
    return response.data.data; // Devuelve los datos de la respuesta
  }
);

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    // Aquí puedes definir otras acciones síncronas si es necesario
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchPeople.fulfilled, (state, action) => {
      // Actualiza el estado con los datos de la respuesta
      state.allPeople = action.payload;
    })
    .addCase(fetchPeopleByName.fulfilled, (state, action) => {
      // Actualiza el estado con la película individual obtenida
      state.singlePeople = action.payload;
    });
  },
});

// Exporta tus acciones y el reducer
export const peopleActions = peopleSlice.actions;
export default peopleSlice.reducer;

// Define tus selectores aquí si los necesitas
export const selectPeople = (state: RootState) => state.people.allPeople;
export const selectSinglePeople = (state: RootState) => state.people.singlePeople;

