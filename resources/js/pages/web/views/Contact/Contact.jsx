import styles from './Contact.module.css';
import WebLayout from '../../layout';
import Banner from '../../components/Banner/Banner';

const Contact = () => {
    return (
        <div>
            <Banner title={'Contato'} />
            <section className={styles.contact_section}>
                <div className={styles.form_grid}>
                    <div className={styles.form_column}>
                        <div className={styles.form_title_content}>
                            <h2 className={styles.form_title}>
                                Dúvidas ou sugestões? Escreva para nós.
                            </h2>
                            <p className={styles.form_description}>
                                Estamos sempre abertos a ouvir nossa comunidade. Se você tem uma pergunta sobre algum destino ou quer apenas dizer um oi, preencha o formulário abaixo.
                            </p>
                        </div>

                        <form className={styles.form}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className={styles.input_group}>
                                    <span className={styles.input_label}>Nome</span>
                                    <input
                                        className={styles.input}
                                        placeholder="Seu nome completo"
                                        type="text"
                                    />
                                </label>

                                <label className={styles.input_group}>
                                    <span className={styles.input_label}>E-mail</span>
                                    <input
                                        className={styles.input}
                                        placeholder="seu@email.com"
                                        type="email"
                                    />
                                </label>
                            </div>

                            <label className={styles.input_group}>
                                <span className={styles.input_label}>Assunto</span>
                                <input
                                    className={styles.input}
                                    placeholder="Como podemos ajudar?"
                                    type="text"
                                />
                            </label>

                            <label className={styles.input_group}>
                                <span className={styles.input_label}>Mensagem</span>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Sua mensagem detalhada..."
                                    rows={6}
                                />
                            </label>

                            <button className={styles.submit_button}>
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>

                    <div className={styles.sidebar_column}>
                        <div className={styles.sidebar_image_container}>
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDalBudIXT_YVVfXS0kp9NkNFg7jgHumMjZ-Bm9Xh7Pjy4b-xbTqSvxdCNxTtoj26-7AbxZ7BQY1AOyvl6e0JLMt7Jf2B6Zb_UuUtXybMsOmsc9NorCu32sL52EBVe08ONtiwd0dIa-JA_HsTpaYDKSAGR7LLTUgJBOZTyA8U5z9fWKI40FbU0YXgD_auQXq2mlUPeiKb00QZaPgHrZvOPjpwv5W7t-tU9eAZmzDkoX1QPtgRg7STiVsoh2urd3cAb0UKHHtSD-E0"
                                alt="Casal de viajantes profissionais em uma estrada cênica"
                                className={styles.sidebar_image}
                            />
                        </div>

                        <div className={styles.sidebar_card}>
                            <div>
                                <h3 className={styles.sidebar_title}>Conexões Profissionais</h3>
                                <div className="flex flex-col gap-4">
                                    <div className={styles.connection_item}>
                                        <div className={styles.icon_circle}>
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className={styles.connection_type}>E-mail Profissional</p>
                                            <p className={styles.connection_email}>parcerias@vivendoemviagem.com</p>
                                        </div>
                                    </div>

                                    <div className={styles.connection_item}>
                                        <div className={styles.icon_circle}>
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.045 3.007 12.31 3a1.965 1.965 0 0 0-1.4.585l-7.33 7.394a2 2 0 0 0 0 2.805l6.573 6.631a1.957 1.957 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 21 11.479v-5.5a2.972 2.972 0 0 0-2.955-2.972Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                                            </svg>

                                        </div>
                                        <div>
                                            <p className={styles.connection_type}>Assessoria de Imprensa</p>
                                            <p className={styles.connection_email}>press@vivendoemviagem.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="divider" />

                            <div>
                                <h3 className={styles.sidebar_title}>Redes Sociais</h3>
                                <div className={styles.social_buttons}>
                                    <a href="#" className={styles.social_link}>
                                        <span>Facebook</span>
                                    </a>
                                    <a href="#" className={styles.social_link}>
                                        <span>Instagram</span>
                                    </a>
                                    <a href="#" className={styles.social_link}>
                                        <span>YouTube</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

Contact.layout = page => <WebLayout>{page}</WebLayout>

export default Contact;