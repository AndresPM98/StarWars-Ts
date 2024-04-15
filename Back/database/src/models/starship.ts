import mongoose, { Schema, Document } from "mongoose";

interface Starship extends Document {
    name: string;
    shipModel: string;
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
    created: Date;
    edited: Date;
    url: string;
}

const starshipSchema: Schema = new Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    manufacturer: { type: String, required: true },
    cost_in_credits: { type: String, required: true },
    length: { type: String, required: true },
    max_atmosphering_speed: { type: String, required: true },
    crew: { type: String, required: true },
    passengers: { type: String, required: true },
    cargo_capacity: { type: String, required: true },
    consumables: { type: String, required: true },
    hyperdrive_rating: { type: String, required: true },
    MGLT: { type: String, required: true },
    starship_class: { type: String, required: true },
    pilots: { type: [String], required: true },
    films: { type: [String], required: true },
    created: { type: Date, required: true },
    edited: { type: Date, required: true },
    url: { type: String, required: true },
});

export default mongoose.model<Starship>("Starship", starshipSchema);
