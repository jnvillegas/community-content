import { Link } from "@inertiajs/react";
import styles from "./Wallpaper.module.css";
import PATHROUTES from "../../helpers/PathRoutes";

const Wallpaper = () => {

    const scrollTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <footer className={styles.footer} id="contact">
            <div className={styles.container} id="wallpaper">
                <div className={styles.card}>
                    <div className={styles.dots_background} />

                    <div className={styles.content}>
                        <span className={styles.badge}>Um presente</span>

                        <h2 className={styles.title}>
                            Leve um pedaço da estrada com você.
                        </h2>

                        <p className={styles.description}>
                            Baixe nossa coleção exclusiva de papéis de parede em alta resolução para
                            celular e computador. Selecionados a partir de nossas manhãs favoritas.
                        </p>

                        <div className={styles.form}>
                            {/* <input
                                type="email"
                                placeholder="Seu endereço de email"
                                className={styles.input}
                            /> */}

                            <Link href="/wallpaper" onClick={scrollTop} className={styles.button}>
                                Obtenha Wallpapers
                            </Link>
                        </div>

                        <p className={styles.disclaimer}>
                            Sem spam. Apenas novidades sobre arte e viagens.
                        </p>
                    </div>

                    <div className={styles.phone_wrapper}>
                        <div className={styles.phone}>
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnFwdhc2WdK0SXdNZf74zFhP6YjBArKy-RO12IRbbGFyJLtLi7RglYeQFmTcGm0PQuQL8gtXCpmxfmDq7E__Z8c8-KpQjbENtdxaA91V0HBHJWb9DP6mUS_m15ATknMqCUAGlSOcxVyj38eiTKUuLxwlwSCLp3p6bqxRBqh1wFd62LWl-UAFu9aX1CG6EIcPcF5SRgklkH1E46LBrOL4cpYX8b3CnMUU-8iSPySeGasWDiEUYHRxQnRu7UJjwHrqikMSUfvIblLXs"
                                alt="Wallpaper preview"
                                className={styles.phone_image}
                            />

                            <div className={styles.phone_time}>09:41</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Wallpaper;
