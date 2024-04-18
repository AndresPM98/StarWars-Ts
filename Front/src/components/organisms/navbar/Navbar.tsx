import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <Link to="/" className={styles.navbarLink}>
            Films
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/people" className={styles.navbarLink}>
            People
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/planets" className={styles.navbarLink}>
            Planets
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/starships" className={styles.navbarLink}>
            Starships
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;