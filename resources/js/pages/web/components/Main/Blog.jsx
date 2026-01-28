import { Link } from "@inertiajs/react";
import styles from "./Blog.module.css";
import PATHROUTES from "../../helpers/PathRoutes";
import { usePage } from '@inertiajs/react';

const Blog = () => {
    const { featuredArticles = [] } = usePage().props;

    const items = featuredArticles.length > 0 ? featuredArticles : [];

    const scrollTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <section className={styles.section} id="blog">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.kicker}>Diário de viagem</h3>
                    <h2 className={styles.title}>Destinos com Alma</h2>
                    <p className={styles.description}>
                        Uma coleção de lugares que marcaram nossas almas. Sensorial Memórias da estrada.
                    </p>
                </div>

                <div className={styles.grid}>
                    {items.map((item, index) => {
                        // Asignamos la variante según la posición
                        let variant = "small"; // por defecto
                        if (index === 0) variant = "featured";
                        if (index === 1) variant = "tall";

                        const cardClass = [
                            styles.card,
                            variant === "featured" && styles.featured,
                            variant === "tall" && styles.tall,
                        ]
                            .filter(Boolean)
                            .join(" ");

                        const isLarge = variant === "featured";

                        // Usamos los campos que vienen del backend
                        // Ajusta los nombres si en tu middleware usaste otros (title, subtitle, image, location)
                        return (
                            <Link href={`/blog/${item.id}`} key={item.id} className={cardClass}>
                                <img
                                    src={item.image && (item.image.startsWith('http') || item.image.startsWith('/storage')) ? item.image : `/storage/${item.image}`}
                                    alt={item.title}
                                    className={styles.image}
                                />

                                <div
                                    className={
                                        isLarge ? styles.overlay_dark : styles.overlay_soft
                                    }
                                />

                                <div
                                    className={
                                        isLarge ? styles.content_large : styles.content
                                    }
                                >
                                    <div className={styles.location}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="22"
                                            viewBox="0 0 18 22"
                                            fill="none"
                                        >
                                            <path
                                                d="M9 11C9.4125 11 9.76563 10.8531 10.0594 10.5594C10.3531 10.2656 10.5 9.9125 10.5 9.5C10.5 9.0875 10.3531 8.73438 10.0594 8.44062C9.76563 8.14687 9.4125 8 9 8C8.5875 8 8.23438 8.14687 7.94063 8.44062C7.64688 8.73438 7.5 9.0875 7.5 9.5C7.5 9.9125 7.64688 10.2656 7.94063 10.5594C8.23438 10.8531 8.5875 11 9 11ZM9 16.5125C10.525 15.1125 11.6562 13.8406 12.3938 12.6969C13.1313 11.5531 13.5 10.5375 13.5 9.65C13.5 8.2875 13.0656 7.17188 12.1969 6.30312C11.3281 5.43437 10.2625 5 9 5C7.7375 5 6.67188 5.43437 5.80313 6.30312C4.93438 7.17188 4.5 8.2875 4.5 9.65C4.5 10.5375 4.86875 11.5531 5.60625 12.6969C6.34375 13.8406 7.475 15.1125 9 16.5125ZM9 18.5C6.9875 16.7875 5.48438 15.1969 4.49063 13.7281C3.49688 12.2594 3 10.9 3 9.65C3 7.775 3.60312 6.28125 4.80938 5.16875C6.01563 4.05625 7.4125 3.5 9 3.5C10.5875 3.5 11.9844 4.05625 13.1906 5.16875C14.3969 6.28125 15 7.775 15 9.65C15 10.9 14.5031 12.2594 13.5094 13.7281C12.5156 15.1969 11.0125 16.7875 9 18.5Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        {item.location}
                                    </div>

                                    <h3
                                        className={
                                            isLarge
                                                ? styles.heading_large
                                                : styles.heading
                                        }
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        className={
                                            isLarge ? styles.text : styles.text_small
                                        }
                                    >
                                        {item.subtitle || item.description} {/* subtitle del backend o fallback */}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}

                    <Link href="/blog" onClick={scrollTop} className={styles.cta}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="44"
                            viewBox="0 0 36 44"
                            fill="none"
                        >
                            <path
                                d="M22.5 35.5L13.5 32.35L6.525 35.05C6.025 35.25 5.5625 35.1937 5.1375 34.8812C4.7125 34.5687 4.5 34.15 4.5 33.625V12.625C4.5 12.3 4.59375 12.0125 4.78125 11.7625C4.96875 11.5125 5.225 11.325 5.55 11.2L13.5 8.5L22.5 11.65L29.475 8.95C29.975 8.75 30.4375 8.80625 30.8625 9.11875C31.2875 9.43125 31.5 9.85 31.5 10.375V31.375C31.5 31.7 31.4063 31.9875 31.2188 32.2375C31.0313 32.4875 30.775 32.675 30.45 32.8L22.5 35.5ZM21 31.825V14.275L15 12.175V29.725L21 31.825ZM24 31.825L28.5 30.325V12.55L24 14.275V31.825ZM7.5 31.45L12 29.725V12.175L7.5 13.675V31.45Z"
                                fill="white"
                            />
                        </svg>
                        <h3 className={styles.cta_h3}>Explore Nosso Diário</h3>
                        <p className={styles.cta_p}>Leia 50+ histórias da estrada.</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Blog;