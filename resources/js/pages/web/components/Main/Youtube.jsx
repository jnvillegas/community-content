import styles from "./Youtube.module.css";
import { usePage } from '@inertiajs/react';

const Youtube = () => {
    const { featuredVideos = [] } = usePage().props;
    console.log("featuredVideos desde backend:", featuredVideos);

    const items = featuredVideos.length > 0 ? featuredVideos : [
    ];


    const cards = [
        {
            title: "O Silêncio dos Andes",
            subtitle: "Uma jornada de 30 dias pelos recantos mais tranquilos da cordilheira, em busca da solidão.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSVc9m9jMDWzeQ-xsrnPIVQ64iN8YYxeMYR4GaHR65xkNmIl12VBcNUSJh-8qhRH_3MYTkNW43Ev4bay2c_foKMVtXG2eTzzczQb15ehvi1mO0rJbr2iki4r2H5o0PbKchIZvuBrJ6AsfxPn2SVhbjxpN814FHricPhNo-L5uvesBx09OnFX9jtZTm8X4VMSoRBdKxw_UKTPK4ZpAENx69q364bsKh3SX6oeqkyO-qKF8aKckH0wpoXDKy8z_k_s4hl6ym0CiKtPI",
            location: "Patagonia",
            youtube_id: "yRApB41gz08"
        },
        {
            title: "O Silêncio dos Andes",
            subtitle: "Uma jornada de 30 dias pelos recantos mais tranquilos da cordilheira, em busca da solidão.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAabDmKl5XcCqgBjr2_QFxrdJwcfIGTlC2kWyoJw-hQFujWMXYbS9eMmlcVv0h6lQhAqnqWGn2FILLU0v6EaBKkz2pbTPKXGJcD_xYoug5J-A8HHACCyih0gqVYMG44b-Rt6WWraBaZsX5SKhlFvcDLlJkLJwDPAknJnUqsxpBLMRlXwoOYqo4IBoN1aJi6CwhY_4iX1NcVD3_k07aIFfd-a1u8MGt_VKXsk9KfOZxN9crdUVpvSMoabce6nZ6FwEV1e5K88ICt6qU",
            location: "Patagonia",
        },
        {
            title: "O Silêncio dos Andes",
            subtitle: "Uma jornada de 30 dias pelos recantos mais tranquilos da cordilheira, em busca da solidão.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzbOtfneGMKarh3XR3zF2k0wrvg0lIM_nwjsQNndOid8jiIudf0JCaCtiiHCcFfTSn67S_vV1v9O93bERAtflyhMJ_L1FpSX6EVVaz0bZA7nawP-E-rd53oH3Ky6wEUIFMQnMouGxdbXWyYm7thtvNJGoSe7VmVgKODW3-sHfNbDC8VzV_3U2GDXSTZ__YE_nSdK7_wcvMyrAQEQ5gQTnsPpdZVZtKzMVNvI7r_8QA6ZOV1rC6S-4_qHj0Ua7oLSyL2K1lW9jVT2k",
            location: "Patagonia",
        },
    ]


    return (
        <section className={styles.section} id="youtube">
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.header_text}>
                        <h3 className={styles.kicker}>Histórias Visuais</h3>
                        <h2 className={styles.title}>Melhores momentos</h2>
                    </div>

                    <a href="https://www.youtube.com/@vivendoemviagem" target="_blank" className={styles.desktop_link}>
                        Ver canal do YouTube
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 25 28" fill="none">
                            <path className={styles.arrow} d="M16.069 14.9723H4.23224V13.0278H16.069L10.6246 7.58339L12.01 6.22228L19.7878 14.0001L12.01 21.7778L10.6246 20.4167L16.069 14.9723Z" fill="currentColor" />
                        </svg>
                    </a>
                </div>

                <div className={styles.grid}>
                    {items.map((item, index) => {
                        return (
                            <a href={`https://www.youtube.com/watch?v=${item.youtube_id}`} className={styles.card} key={index} target="_blank">
                                <div className={styles.image}>
                                    <img src={item.thumbnail} className={styles.thumbnail} />
                                    <div className={styles.overlay}>
                                        <div className={styles.play_button}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="36" viewBox="0 0 30 36" fill="none">
                                                <path d="M10 26.75V9.25L23.75 18L10 26.75ZM12.5 22.1875L19.0625 18L12.5 13.8125V22.1875Z" fill="white" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.card_body}>
                                    <div className={styles.meta}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                                            <path d="M9 11C9.4125 11 9.76563 10.8531 10.0594 10.5594C10.3531 10.2656 10.5 9.9125 10.5 9.5C10.5 9.0875 10.3531 8.73438 10.0594 8.44062C9.76563 8.14687 9.4125 8 9 8C8.5875 8 8.23438 8.14687 7.94063 8.44062C7.64688 8.73438 7.5 9.0875 7.5 9.5C7.5 9.9125 7.64688 10.2656 7.94063 10.5594C8.23438 10.8531 8.5875 11 9 11ZM9 16.5125C10.525 15.1125 11.6562 13.8406 12.3938 12.6969C13.1313 11.5531 13.5 10.5375 13.5 9.65C13.5 8.2875 13.0656 7.17188 12.1969 6.30312C11.3281 5.43437 10.2625 5 9 5C7.7375 5 6.67188 5.43437 5.80313 6.30312C4.93438 7.17188 4.5 8.2875 4.5 9.65C4.5 10.5375 4.86875 11.5531 5.60625 12.6969C6.34375 13.8406 7.475 15.1125 9 16.5125ZM9 18.5C6.9875 16.7875 5.48438 15.1969 4.49063 13.7281C3.49688 12.2594 3 10.9 3 9.65C3 7.775 3.60312 6.28125 4.80938 5.16875C6.01563 4.05625 7.4125 3.5 9 3.5C10.5875 3.5 11.9844 4.05625 13.1906 5.16875C14.3969 6.28125 15 7.775 15 9.65C15 10.9 14.5031 12.2594 13.5094 13.7281C12.5156 15.1969 11.0125 16.7875 9 18.5Z" fill="#969696" />
                                        </svg>
                                        <span>{item.location}</span>
                                    </div>

                                    <h3 className={styles.card_title}>{item.title}</h3>
                                    <p className={styles.card_text}>
                                        {item.subtitle}
                                    </p>
                                </div>
                            </a>
                        )
                    })}
                </div>

                <div className={styles.mobile_link}>
                    <a href="https://www.youtube.com/@vivendoemviagem" target="_blank">
                        Ver canal do YouTube
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 25 28" fill="none">
                            <path className={styles.arrow} d="M16.069 14.9723H4.23224V13.0278H16.069L10.6246 7.58339L12.01 6.22228L19.7878 14.0001L12.01 21.7778L10.6246 20.4167L16.069 14.9723Z" fill="currentColor" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Youtube;