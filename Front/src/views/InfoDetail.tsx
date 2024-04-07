import { Film } from "../redux/films/filmsSlice";

interface InfoDetailProps {
    selectedItem: Film | null;
    onClick: () => void;
}
/* interface InfoDetailProps {
    selectedItem: Film | People | Planet | Starship | null;
} */

export function InfoDetail({ selectedItem, onClick }: InfoDetailProps) {
    
    return (
        <div className="h-full w-full">
            <button onClick={onClick}>Volver</button>
            <h1>{selectedItem?.title}</h1>
        </div>
    );
}

