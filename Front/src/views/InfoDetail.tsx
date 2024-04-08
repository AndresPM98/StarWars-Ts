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
        <div className="h-screen w-screen p-5 bg-black">
            <div className="h-[10%]">
                <button onClick={onClick} className="bg-yellow-300 h-[2rem] w-[5rem] px-2 rounded-sm">Volver</button>
            </div>
            
            <div className="h-[90%] w-full flex items-center justify-center">
                {selectedItem ? (
                <div className="flex flex-col items-center bg-white h-[90%] w-[40%] p-3 border-4 border-yellow-300 rounded-md">
                    {("title" in selectedItem) && (
                        <>
                            <h1 className="text-[2rem] font-bold">{selectedItem.title}</h1>
                            <h2 className="text-[1.5rem]">{selectedItem.director}</h2>
                            <h3 className="text-[1rem]">{selectedItem.producer}</h3>
                            <p className="text-[1rem] mt-5">{selectedItem.opening_crawl}</p>
                        </>
                    )}
                    {("name" in selectedItem) && (
                        <>
                            <h1 className="text-[2rem] font-bold">{selectedItem.name}</h1>
                        </>
                    )}
                </div>
            ) : (
                <div>No hay detalle seleccionado</div>
            )}
            </div>
            
        </div>
    );
}
