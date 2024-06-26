import axios, { AxiosResponse } from 'axios';

interface Planet {
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

interface SwapiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Planet[];
}

const baseUrl: string = 'http://database:8005';
const filmsEndpoint: string = '/planets';

const getData = async <T>(url: string): Promise<T> => {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
};

const data = {
    list: async (): Promise<SwapiResponse> => {
        const response: SwapiResponse = await getData<SwapiResponse>(`${baseUrl}${filmsEndpoint}`);
        return response;
    },
    getByName: async (name: string): Promise<Planet[]> => {
        const url: string = `${baseUrl}${filmsEndpoint}/${encodeURIComponent(name)}`;
        const planet: Planet[] = await getData<Planet[]>(url);
        return planet;
    }
};

export default data;

