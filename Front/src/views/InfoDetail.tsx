import { Film } from "../redux/films/filmsSlice";
import { People } from "../redux/people/peopleSlice";
import { Planet } from "../redux/planets/planetsSlice";
import { Starship } from "../redux/starships/starshipsSlice";

interface InfoDetailProps {
    selectedItem: Film | People | Planet | Starship | null;
    onClick: () => void;
}

export function InfoDetail({ selectedItem, onClick }: InfoDetailProps) {
    return (
        <div className="h-full w-full">
            <button onClick={onClick}>Volver</button>
            {selectedItem ? (
                <>
                    {("title" in selectedItem) && (
                        <>
                            <h1 className="text-[2rem] font-bold">{selectedItem.title}</h1>
                            <h2 className="text-[1.5rem]">{selectedItem.director}</h2>
                            <h3 className="text-[1rem]">{selectedItem.producer}</h3>
                        </>
                    )}
                    {("name" in selectedItem) && (
                        <>
                            <h1 className="text-[2rem] font-bold">Name: {selectedItem.name}</h1>
                        </>
                    )}
                </>
            ) : (
                <div>No hay detalle seleccionado</div>
            )}
        </div>
    );
}
