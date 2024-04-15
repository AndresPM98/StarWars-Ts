import mongoose, { Schema, Document } from "mongoose";

interface Film extends Document {
    title: string;
    episodeId: number;
    openingCrawl: string;
    director: string;
    producer: string;
    releaseDate: Date;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: Date;
    edited: Date;
    url: string;
}

const filmSchema: Schema = new Schema({
    title: { type: String, required: true },
    episodeId: { type: Number, required: true },
    openingCrawl: { type: String, required: true },
    director: { type: String, required: true },
    producer: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    characters: { type: [String], required: true },
    planets: { type: [String], required: true },
    starships: { type: [String], required: true },
    vehicles: { type: [String], required: true },
    species: { type: [String], required: true },
    created: { type: Date, required: true },
    edited: { type: Date, required: true },
    url: { type: String, required: true },
});

export default mongoose.model<Film>("Film", filmSchema);
