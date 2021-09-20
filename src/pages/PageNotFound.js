import styles from './PageNotFound.module.css';

const PageNotFound = () => {
    return (
      <section className={styles.error}>
        <h1>😭404😭</h1>
        <h2>💔Page Not Found💔</h2>
      </section>
    );
}

export default PageNotFound;