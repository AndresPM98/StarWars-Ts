import mongoose, { Schema, Document } from "mongoose";

interface People extends Document {
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
    created: Date;
    edited: Date;
    url: string;
}

const peopleSchema: Schema = new Schema({
    name: { type: String, required: true },
    height: { type: String, required: true },
    mass: { type: String, required: true },
    hair_color: { type: String, required: true },
    skin_color: { type: String, required: true },
    eye_color: { type: String, required: true },
    birth_year: { type: String, required: true },
    gender: { type: String, required: true },
    homeworld: { type: String, required: true },
    films: { type: [String], required: true },
    species: { type: [String], required: true },
    vehicles: { type: [String], required: true },
    starships: { type: [String], required: true },
    created: { type: Date, required: true },
    edited: { type: Date, required: true },
    url: { type: String, required: true },
});

export default mongoose.model<People>("People", peopleSchema);
