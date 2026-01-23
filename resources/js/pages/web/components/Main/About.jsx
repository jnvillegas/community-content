import styles from "./About.module.css";
import { Link } from '@inertiajs/react';

const About = () => {
    return (
        <section className={styles.section} id="about">
            <div className={styles.background_gradient} />

            <div className={styles.container}>
                <div className={styles.wrapper}>

                    <div className={styles.image_wrapper}>
                        <div className={styles.image_card}>
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl3fxumaL3HWuL_Od0pgWrCODVv3wQ2pV-gq2oTUWhDBEScxk9l5UkT9FMFxz25FY71pa9m62YkYi8iU6UtD758GaPDHXCsrMp7FrspeFa8DVc9T8hGgUlA0y9hs90iMVEv0TxPijD15hK6k4T_cd1Bi6aXNT_hN1fvRzLOq4XWJ_hN8JrVIAMFmX8pJ8msxj5zLkC94eOpPc70c__iundCzM4Uhzyl70YBZUroolwusFMI20BLFr81nWDybeHYw0YlH6I1LJj8ic"
                                alt="Deividi & Paula"
                                className={styles.image}
                            />

                            <div className={styles.image_overlay} />

                            <div className={styles.image_caption}>
                                <p className={styles.names}>Deividi &amp; Paula</p>
                                <p className={styles.role}>Fundadores &amp; Exploradores</p>
                            </div>
                        </div>

                        <div className={styles.corner_decoration} />
                    </div>

                    <div className={styles.content}>
                        <h2 className={styles.heading}>
                            Nós acreditamos em{" "}
                            <span className={styles.highlight}>consciente</span> observação.
                        </h2>

                        <div className={styles.text}>
                            <p>
                                Queremos encorajar você a ouvir seus sonhos, se permitir viajar mais e
                                viver a vida com espírito de aventura, porque não é preciso muito para
                                começar.
                            </p>

                            <p>
                                Em 2023, saímos de nossos trabalhos e escolhemos deixar a
                                estabilidade para viver um sonho, conhecer o mundo de forma
                                verdadeira.
                            </p>

                            <p>
                                Muitos acham loucura trocar o seguro pelo desconhecido.
                                Para nós, loucura seria chegar ao fim da vida sem ter estado
                                verdadeiramente presente e ter deixado esse sonho guardado em uma
                                caixa fechada. Então, decidimos arriscar e seguir Vivendo em Viagem.
                            </p>

                            <p className={styles.quote}>
                                "Às vezes, tudo o que um sonho precisa é de coragem para dar o
                                primeiro passo."
                            </p>
                        </div>

                        <div className={styles.cta}>
                            <Link href="/about" className={styles.button}>
                                Historia Completa
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
