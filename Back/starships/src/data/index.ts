import axios, { AxiosResponse } from 'axios';

interface Starship {
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


interface SwapiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Starship[];
}

const baseUrl: string = 'http://database:8005';
const filmsEndpoint: string = '/starships';

const getData = async <T>(url: string): Promise<T> => {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
};

const data = {
    list: async (): Promise<SwapiResponse> => {
        const response: SwapiResponse = await getData<SwapiResponse>(`${baseUrl}${filmsEndpoint}`);
        return response;
    },
    getByName: async (name: string): Promise<Starship[]> => {
        const url: string = `${baseUrl}${filmsEndpoint}/${encodeURIComponent(name)}`;
        const starship: Starship[] = await getData<Starship[]>(url);
        return starship;
    }
};

export default data;
