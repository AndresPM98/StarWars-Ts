import axios, { AxiosResponse } from "axios";

interface People {
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

export default {
    list: async (): Promise<People[]> => {
        const response: AxiosResponse<{ results: People[] }> = await axios.get("http://swapi.dev/api/people");
        return response.data.results;
    },
    getById: async (id: number): Promise<People> => {
        const response: AxiosResponse<People> = await axios.get(`http://swapi.dev/api/people/${id}`);
        return response.data;
    }
};
