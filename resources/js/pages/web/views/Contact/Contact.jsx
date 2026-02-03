import styles from './Contact.module.css';
import WebLayout from '../../layout';
import Banner from '../../components/Banner/Banner';
import { SOCIAL } from '../../helpers/PathRoutes';

const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

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

                            <button className={styles.submit_button} onClick={handleSubmit}>
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
                                                <path fillRule="evenodd" d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clipRule="evenodd" />
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
                                    <a href={SOCIAL.FACEBOOK} target="_blank" className={styles.social_link}>
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                        </svg>
                                        <span>Facebook</span>
                                    </a>
                                    <a href={SOCIAL.INSTAGRAM} target='_blank' className={styles.social_link}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.2625 1.66651C12.2875 1.66651 12.5825 1.67734 13.4358 1.71651C14.3225 1.75734 14.9283 1.89818 15.4583 2.10401C16.0146 2.31307 16.5185 2.64097 16.935 3.06484C17.3589 3.48132 17.6868 3.98526 17.8958 4.54151C18.1017 5.07151 18.2425 5.67734 18.2833 6.56401C18.3233 7.45318 18.3333 7.73651 18.3333 9.99984V10.0665C18.3333 12.269 18.3233 12.5557 18.2833 13.4357C18.2425 14.3223 18.1017 14.9282 17.8958 15.4582C17.6868 16.0144 17.3589 16.5184 16.935 16.9348C16.5185 17.3587 16.0146 17.6866 15.4583 17.8957C14.9283 18.1015 14.3225 18.2423 13.4358 18.2832C12.5467 18.3232 12.2633 18.3332 9.99999 18.3332H9.93332C7.73082 18.3332 7.44416 18.3232 6.56416 18.2832C5.67749 18.2423 5.07166 18.1015 4.54166 17.8957C3.98541 17.6866 3.48147 17.3587 3.06499 16.9348C2.64112 16.5184 2.31322 16.0144 2.10416 15.4582C1.89832 14.9282 1.75749 14.3223 1.71666 13.4357C1.67749 12.5823 1.66666 12.2865 1.66666 10.2623V9.73734C1.66666 7.71234 1.67749 7.41734 1.71666 6.56401C1.75749 5.67734 1.89832 5.07151 2.10416 4.54151C2.31322 3.98526 2.64112 3.48132 3.06499 3.06484C3.47272 2.59327 3.98297 2.22128 4.55666 1.97734C5.08666 1.77151 5.69249 1.63068 6.57916 1.58984C7.41749 1.67734 7.71332 1.66651 9.73749 1.66651H10.2625ZM10.195 3.16818H9.80499C7.75832 3.16818 7.48499 3.17734 6.63249 3.21651C5.81999 3.25401 5.37916 3.38901 5.08499 3.50318C4.69582 3.65484 4.41832 3.83484 4.12666 4.12651C3.83499 4.41818 3.65499 4.69568 3.50332 5.08484C3.38916 5.37901 3.25332 5.81984 3.21666 6.63234C3.17749 7.48484 3.16832 7.75818 3.16832 9.80484V10.1948C3.16832 12.2415 3.17749 12.5148 3.21666 13.3673C3.25416 14.1798 3.38916 14.6207 3.50332 14.9148C3.65499 15.3032 3.83582 15.5815 4.12666 15.8732C4.41832 16.1648 4.69582 16.3448 5.08499 16.4965C5.37916 16.6107 5.81999 16.7465 6.63249 16.7832C7.51082 16.8232 7.77416 16.8315 9.99999 16.8315H10.0667C12.2308 16.8315 12.4975 16.8232 13.3667 16.7832C14.18 16.7457 14.6208 16.6107 14.915 16.4965C15.3033 16.3448 15.5817 16.1648 15.8733 15.8732C16.165 15.5815 16.345 15.304 16.4967 14.9148C16.6108 14.6207 16.7467 14.1798 16.7833 13.3673C16.8233 12.4882 16.8317 12.2257 16.8317 9.99984V9.93318C16.8317 7.76901 16.8233 7.50234 16.7833 6.63318C16.7458 5.81984 16.6108 5.37901 16.4967 5.08484C16.3631 4.72282 16.1501 4.39534 15.8733 4.12651C15.6045 3.84973 15.277 3.63673 14.915 3.50318C14.6208 3.38901 14.18 3.25318 13.3675 3.21651C12.515 3.17734 12.2417 3.16818 10.195 3.16818ZM9.99999 5.72068C10.5619 5.72068 11.1184 5.83136 11.6376 6.04641C12.1567 6.26146 12.6285 6.57666 13.0258 6.97402C13.4232 7.37137 13.7384 7.84311 13.9534 8.36228C14.1685 8.88145 14.2792 9.4379 14.2792 9.99984C14.2792 10.5618 14.1685 11.1182 13.9534 11.6374C13.7384 12.1566 13.4232 12.6283 13.0258 13.0257C12.6285 13.423 12.1567 13.7382 11.6376 13.9533C11.1184 14.1683 10.5619 14.279 9.99999 14.279C8.86508 14.279 7.77666 13.8282 6.97416 13.0257C6.17166 12.2232 5.72082 11.1347 5.72082 9.99984C5.72082 8.86494 6.17166 7.77652 6.97416 6.97402C7.77666 6.17152 8.86508 5.72068 9.99999 5.72068ZM9.99999 7.22234C9.26335 7.22234 8.55688 7.51497 8.036 8.03585C7.51512 8.55674 7.22249 9.2632 7.22249 9.99984C7.22249 10.7365 7.51512 11.443 8.036 11.9638C8.55688 12.4847 9.26335 12.7773 9.99999 12.7773C10.7366 12.7773 11.4431 12.4847 11.964 11.9638C12.4849 11.443 12.7775 10.7365 12.7775 9.99984C12.7775 9.2632 12.4849 8.55674 11.964 8.03585C11.4431 7.51497 10.7366 7.22234 9.99999 7.22234ZM14.4483 4.55151C14.7135 4.55151 14.9679 4.65687 15.1554 4.8444C15.343 5.03194 15.4483 5.28629 15.4483 5.55151C15.4483 5.81673 15.343 6.07108 15.1554 6.25862C14.9679 6.44615 14.7135 6.55151 14.4483 6.55151C14.1831 6.55151 13.9288 6.44615 13.7412 6.25862C13.5537 6.07108 13.4483 5.81673 13.4483 5.55151C13.4483 5.28629 13.5537 5.03194 13.7412 4.8444C13.9288 4.65687 14.1831 4.55151 14.4483 4.55151Z" fill="currentColor" />
                                        </svg>
                                        <span>Instagram</span>
                                    </a>
                                    <a href={SOCIAL.YOUTUBE} target="_blank" className={styles.social_link}>
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                        </svg>
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