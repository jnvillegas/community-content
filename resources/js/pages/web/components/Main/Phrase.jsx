import styles from "./Phrase.module.css";

const Phrase = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>

                <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" width="68" height="48" viewBox="0 0 68 48" fill="none">
                    <path className={styles.quote_icon} d="M6.8 48L16 32C11.6 32 7.83333 30.4333 4.7 27.3C1.56667 24.1667 0 20.4 0 16C0 11.6 1.56667 7.83333 4.7 4.7C7.83333 1.56667 11.6 0 16 0C20.4 0 24.1667 1.56667 27.3 4.7C30.4333 7.83333 32 11.6 32 16C32 17.5333 31.8167 18.95 31.45 20.25C31.0833 21.55 30.5333 22.8 29.8 24L16 48H6.8ZM42.8 48L52 32C47.6 32 43.8333 30.4333 40.7 27.3C37.5667 24.1667 36 20.4 36 16C36 11.6 37.5667 7.83333 40.7 4.7C43.8333 1.56667 47.6 0 52 0C56.4 0 60.1667 1.56667 63.3 4.7C66.4333 7.83333 68 11.6 68 16C68 17.5333 67.8167 18.95 67.45 20.25C67.0833 21.55 66.5333 22.8 65.8 24L52 48H42.8ZM16 22C17.6667 22 19.0833 21.4167 20.25 20.25C21.4167 19.0833 22 17.6667 22 16C22 14.3333 21.4167 12.9167 20.25 11.75C19.0833 10.5833 17.6667 10 16 10C14.3333 10 12.9167 10.5833 11.75 11.75C10.5833 12.9167 10 14.3333 10 16C10 17.6667 10.5833 19.0833 11.75 20.25C12.9167 21.4167 14.3333 22 16 22ZM52 22C53.6667 22 55.0833 21.4167 56.25 20.25C57.4167 19.0833 58 17.6667 58 16C58 14.3333 57.4167 12.9167 56.25 11.75C55.0833 10.5833 53.6667 10 52 10C50.3333 10 48.9167 10.5833 47.75 11.75C46.5833 12.9167 46 14.3333 46 16C46 17.6667 46.5833 19.0833 47.75 20.25C48.9167 21.4167 50.3333 22 52 22Z" fill="currentColor" fillOpacity="0.2" />
                </svg>

                {/* <blockquote className={styles.quote}>
                    Viajar não é fugir da vida, mas sim vivê-la{" "}
                    <span className={styles.highlight}>para não nos escapar</span>. Perseguimos
                    o horizonte não para ser visto, mas para ser visto.
                </blockquote> */}

                <blockquote className={styles.quote}>
                    Viajar não é colecionar lugares, é permitir que cada caminho desorganize quem achávamos que éramos{" "}
                    <span className={styles.highlight}>e nos reconstrua</span> com mais consciência e sensibilidade.
                </blockquote>

                <cite className={styles.cite}>
                    — The Vivendo em Viagem Manifesto
                </cite>
            </div>
        </section>
    );
};

export default Phrase;
