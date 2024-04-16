// planetModel.ts
import mongoose, { Schema, Document } from "mongoose";

interface Planet extends Document {
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
    created: Date;
    edited: Date;
    url: string;
}

const planetSchema: Schema = new Schema({
    name: { type: String, required: true },
    rotation_period: { type: String, required: true },
    orbital_period: { type: String, required: true },
    diameter: { type: String, required: true },
    climate: { type: String, required: true },
    gravity: { type: String, required: true },
    terrain: { type: String, required: true },
    surface_water: { type: String, required: true },
    population: { type: String, required: true },
    residents: { type: [String], required: true },
    films: { type: [String], required: true },
    created: { type: Date, required: true },
    edited: { type: Date, required: true },
    url: { type: String, required: true },
});

export default mongoose.model<Planet>("Planet", planetSchema);
