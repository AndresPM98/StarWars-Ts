import axios, { AxiosResponse } from 'axios';

interface Film {
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

interface SwapiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Film[];
}

const baseUrl: string = 'https://swapi.dev/api/films';

const getData = async <T>(url: string): Promise<T> => {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
};

const data = {
    list: async (): Promise<SwapiResponse> => {
        const response: SwapiResponse = await getData(baseUrl);
        return response;
    }
};

export default data;
