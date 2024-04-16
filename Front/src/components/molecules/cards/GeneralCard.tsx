import { People } from '../../../redux/people/peopleSlice';
import { Planet } from '../../../redux/planets/planetsSlice';
import { Starship } from '../../../redux/starships/starshipsSlice';
import styles from './Cards.module.css';

interface GeneralCardProps {
    people?: People;
    planet?: Planet;
    starship?: Starship;
    onClick: () => void;
}

export function GeneralCard({
    people,
    planet,
    starship,
    onClick,
}: GeneralCardProps) {
    return (
        <div
            className={`${styles.generalCard} ${styles.hoverEffect}`}
            onClick={onClick}
        >
            <h1 className={styles.title}>
                {people
                    ? people.name
                    : planet
                    ? planet.name
                    : starship
                    ? starship.name
                    : 'N/A'}
            </h1>
        </div>
    );
}