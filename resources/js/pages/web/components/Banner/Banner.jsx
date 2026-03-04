import styles from './Banner.module.css';
import img from '../../assets/about/banner.jpg'

const Banner = ({ title, subtitle, url }) => {
    const imageUrl = url || 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // fallback
    // Opcional: fallback si no llega url
    // const bgImage = url
    //     ? `url(${url})`
    //     : 'ur[](https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';


    return (
        <section className={styles.main}>
            {/* Aplicamos el background directamente aquí con inline style */}
            {/* <div
                className={styles.background}
                style={{
                    backgroundImage: bgImage,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            /> */}

            <img
                src={imageUrl}
                alt={title || "Banner background"}
                className={styles.background}
                onError={(e) => {
                    e.currentTarget.src = '/fallback.jpg'; // imagen de respaldo local
                }}
            />

            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>

            <div className={styles.filter} />
        </section>
    );
};

export default Banner;