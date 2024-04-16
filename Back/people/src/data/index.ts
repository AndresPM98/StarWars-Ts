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

interface SwapiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: People[];
}

const baseUrl: string = 'http://database:8005';
const filmsEndpoint: string = '/people';

const getData = async <T>(url: string): Promise<T> => {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
};

const data = {
    list: async (): Promise<SwapiResponse> => {
        const response: SwapiResponse = await getData<SwapiResponse>(`${baseUrl}${filmsEndpoint}`);
        return response;
    },
    getByName: async (name: string): Promise<People[]> => {
        const url: string = `${baseUrl}${filmsEndpoint}/${encodeURIComponent(name)}`;
        const people: People[] = await getData<People[]>(url);
        return people;
    }
};

export default data;
