import { People } from "../../redux/people/peopleSlice";
import { Planet } from "../../redux/planets/planetsSlice";
import { Starship } from "../../redux/starships/starshipsSlice";

interface GeneralCardProps {
    people?: People;
    planet?: Planet;
    starship?: Starship;
    onClick: () => void;
}

export function GeneralCard({ people, planet, starship, onClick }: GeneralCardProps) {
    return (
        <div className="w-[30rem] border rounded-md p-5 mb-5 flex cursor-pointer hover:transform hover:scale-105 hover:shadow-md" onClick={onClick}>    
            <h1 className="text-lg font-bold">{people ? people.name : planet ? planet.name : starship ? starship.name : "N/A"}</h1>
        </div>
    );
}
