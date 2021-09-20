import styles from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom';

const MainNavigation = () => {
    return (
      <header className={styles.header}>
        <h2 className={styles.logo}>Great Quotes</h2>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink to="/quotes" activeClassName={styles.active}>
                All Quotes
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-quote" activeClassName={styles.active}>
                Add Quotes
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
}

export default MainNavigation;