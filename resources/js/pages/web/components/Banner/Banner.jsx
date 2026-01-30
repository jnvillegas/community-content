import styles from './Banner.module.css';

const Banner = ({ title, subtitle }) => {
    return (
        <section className={styles.main}>
            <div className={styles.background}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            <div className={styles.filter}></div>
        </section>
    );
}
export default Banner; 