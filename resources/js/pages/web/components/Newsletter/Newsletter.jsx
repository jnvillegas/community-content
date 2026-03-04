import styles from './Newsletter.module.css'
import img from '../../assets/blog/newsletter.jpg'

const Newsletters = () => {
    return (
        <section className={styles.newsletter_section}>
            <div className={styles.newsletter_container}>
                <div className={styles.section_header}>
                    <span className={styles.newsletter_badge}>Newsletters</span>
                </div>

                <div className={styles.newsletter_card}>
                    <div className={styles.image_container}>
                        <img src={img} alt="" className={styles.image} />
                    </div>

                    <div className={styles.newsletter_content}>
                        <div className={styles.text_group}>
                            <h2 className={styles.newsletter_title}>Abra suas janelas</h2>
                            <p className={styles.newsletter_description}>
                                Assine nossa newsletter para receber histórias exclusivas,
                                guias de viagem secretas semanalmente diretamente em sua caixa de
                                entrada.
                            </p>
                        </div>

                        <div className={styles.form_group}>
                            <div className={styles.input_wrapper}>
                                <input
                                    type="email"
                                    placeholder="Seu e-mail"
                                    className={styles.email_input}
                                />
                                <button className={styles.subscribe_button}>Inscrever-se</button>
                            </div>
                            <p className={styles.privacy_note}>
                                Respeitamos sua privacidade. Cancele a qualquer momento.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletters;