import styles from './Login.module.css';
import image from '../../assets/login-pattern.jpg';
import { Link } from 'react-router-dom';
import PATHROUTES from '../../helpers/PathRoutes';

const Login = () => {
    return (
        <div className={styles.page_container}>
            <div className={styles.login_card}>
                <div className={styles.form_side}>
                    <div className={styles.back_link_container}>
                        <Link to={PATHROUTES.HOME} className={styles.back_link}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Voltar ao início
                        </Link>
                    </div>

                    <div className={styles.logo_and_title}>
                        {/* <div className={styles.logo_wrapper}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div> */}
                        <h1 className={styles.main_title}>Faça login na sua conta.</h1>
                        <p className={styles.subtitle}>
                            Por favor, prossiga para iniciar sessão na sua conta.
                        </p>
                    </div>

                    <form className={styles.login_form}>
                        <div className={styles.input_group}>
                            <input
                                type="email"
                                placeholder="Digite seu e-mail"
                                className={styles.email_input}
                            />
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                className={styles.email_input}
                            />
                        </div>

                        <button type="submit" className={styles.continue_button}>
                            Continuar
                        </button>
                    </form>

                    <div className={styles.divider_container}>
                        <div className={styles.divider_line}></div>
                        <span className={styles.or_text}>OU</span>
                        <div className={styles.divider_line}></div>
                    </div>

                    <div className={styles.social_buttons}>
                        <button className={styles.social_button}>
                            <svg className={styles.social_icon} viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continuar com o Google
                        </button>

                        {/* <button className={styles.social_button}>
                            <svg className={styles.social_icon_discord} viewBox="0 0 24 24">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z" />
                            </svg>
                            Continue with Discord
                        </button> */}
                    </div>
                </div>

                <div className={styles.pattern_side}>
                    <img src={image} alt="" className={styles.image_pattern} />
                </div>
            </div>
        </div>
    );
}

export default Login;