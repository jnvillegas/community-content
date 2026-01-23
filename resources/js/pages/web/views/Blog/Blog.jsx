import React from 'react';
import styles from './Blog.module.css';
import Footer from '../../components/Footer/Footer';
import { Link } from '@inertiajs/react';
import Navbar from "../../components/Navbar/Navbar";
import { useAppearance } from "@/hooks/use-appearance";

const stories = [
    {
        id: 1,
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBjDVkKflTgrZ_1rZhK8XUsFSkzFscq-8kU3zhsKLKLtqfy26e-kxMpLrRGuuZDM1GidGhAcdhAPE0_cAlbpRO_rswzb2fraB5Z9cIzwJaG8osoylSQgG7fUNYFqzWwUMfslFIHWRh85WW2DThxQ6nbYvhGf8molibdRLGLefzwieOLYm7CeEuuHQXAM_4nlJpEVL66yIaxk5KVZuKoivO_LkUosg6y8t2qqsEVtdlpMBqzPns7PBkJgNfNuiyIrhXlkHan4n_L_o8',
        category: 'Natureza',
        title: 'Flavor of the Wild: Gastronomia Outdoor',
    },
    {
        id: 2,
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCkKwzo3NlZ9IT_RD0sHewYYyuK6IkUODr1etF8lQ0gLZr8QUIAMGezpp4h4BBiMefZSnfvlZ5zj-BFwLa4nV9_ps3BvZ2PU9GlXAat-YEYFLns8tsJFGc79CkPw-maMPxNeUg730bdX8WXRyqKkrwOxTYsht3TLht-XUX5PjwEm39UZH9KdH8n6PPRix50eolh32Q9AR2lxJDKiWVsc5FsjwY9lGzMrmRoS3C4VghEg_AjyJLA5lz3ymAztRTMONrdaWRRpAKSKC8',
        category: 'Expedição',
        title: 'Nas Profundezas da Floresta Nublada',
    },
    {
        id: 3,
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDYYZHxcjf7vpCYss95-hA86Le8tHOM9sG3tkCI24ncLT3OjMOJ4YoY0OjKw23N5iBvDo5FQ472p5q5KVCw1zLal1EFkdcjaskXFc_6wfkE1-wuzERuNFqXqpThxdwuBzaFYRMrlhRvKJvTqntGIUVFS5NhpN-ZTzC-NvLoqqR_RVyf91ne6dk3w48QHYWUtDD1zsfmyuHUNImLpGr0F9JV5qQ8eY1amJXFhi1mHFsb3YpxKraEicWvnDv2h5JHA4bwaSDHqMVI6x4',
        category: 'Dicas',
        title: 'Um Milhão de Estrelas: Guia de Astrofotografia',
    },
    {
        id: 4,
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB-8XOuuzUW8hKH2b3mAJu3ekrEPlpUhDbQEn14uY2oME8dkygr3s58CMDstqewoEIti1ciULmKzJoJkOQEHFD4_jg5RaaeEr87-Ue_S9EsGacdmdR3GTY37dB7PwW4NLIPeMkTrAw4J50AwsjEsWY3tBBL_pgQJ37sJRFxCmNEVPYn4Vf6aZIgfF79OykmVZy2FXmBy1r5Ueg_ettpXMssD6DAPRwVD4QV-g1dkftySX-TNz-PT5VM0q6Fi7DXWsgoLPnBCBDdFPM',
        category: 'Montanha',
        title: 'Reflexos: A Calmaria dos Lagos Alpinos',
    },
    {
        id: 5,
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAqe3CZnbLHli5nNxDhYm7rWPj0ntPCxnGzCE4nZBB_AGGKI2cll5-kkDzi47OMVEpdOn1-7WBYWcKf8yBpsWVgkPpXVPAPX49531W6HiMTxbmHza7ksmin6ZsnoTZq87GYqNI2S6iVWIhJD4kDL2ZlFRft0mUAgQJRSkjNBKLaJheJvZMjeR8trAGDPBJcBlP0zdezZKe8ZzAN7DnvFfeETROUhpVfnl8dZitJKuPIWTcWP5FAotLbK0LXgX8HLAjWVxHdZLUb9SE',
        category: 'Vanlife',
        title: 'A Liberdade de Viver em Quatro Rodas',
    },
    {
        id: 6,
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBestFkZxoIuW6Qx-EOmwf65_7kxa0D8NOF1zyUkKq4xGAyyASCVRlqtLCDbQ0KxcGouhnO6H5MqKQB-OE8UFzkq1iVOjxrxIywrHcg4CkP6ofDKoFQm05O-U1BeUrQwnqB3SjBdcRVF8c9U3rFbBjxxGRGGh2pX4hoC3JQs-FwaAU35FwWAFAmqlOl6JOKUMQH4cJ7eI-ntx9kFGyhajDDhs1TDzBxgFC9GxxqFVherWmVV80wqUHakIs7-JMWNoHQS2inc3KpyRM',
        category: 'Mente',
        title: 'Solidão e Silêncio: O que a trilha ensina',
    },
];

const scrolToTop = () => {
    window.scrollTo(0, 0);
}

const Blog = () => {
    const { appearance, updateAppearance } = useAppearance();
    const darkMode = appearance === 'dark';

    const toggleTheme = () => {
        updateAppearance(darkMode ? 'light' : 'dark');
    };

    return (
        <div className="web-layout">
            <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
            <section className={styles.hero}>
                <div className={styles.parallax_bg}></div>
                <div className={styles.hero_content}>
                    <h1 className={styles.hero_title}>Blog</h1>
                </div>
                <div className={styles.filter}></div>
            </section>

            <section className={styles.newsletter_section}>
                <div className={styles.newsletter_container}>
                    <div className={styles.section_header}>
                        <span className={styles.newsletter_badge}>Newsletters</span>
                    </div>

                    <div className={styles.newsletter_card}>
                        <div className={styles.image_container}>
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKu4g4cYm0CBCv0n9FEEmry0cVJiKseeSj7NhKSbg4_nvjUvhvattRCgvcKPhjS2_j3n8ite-_OX1BWYUADFOBHrY8oak4xKqIipuNxAJ-auq1Uxpw95cPpcgGXUTGe1X_qrid4qININLGZw5mSnk4mLNE45dg9S1bAuzJcBLaRPXCn1OdFIvPPVXf4D3T1TN0N2c5v8NUHOlA84ta6xiIeUfrQ7GtG6kgpe2xnYsJel4beq9Tp2USBquwwlw-kV1i4P010NE4eA" alt="" className={styles.image} />
                            {/* <div
                                className={styles.newsletter_background}
                                style={{
                                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvKu4g4cYm0CBCv0n9FEEmry0cVJiKseeSj7NhKSbg4_nvjUvhvattRCgvcKPhjS2_j3n8ite-_OX1BWYUADFOBHrY8oak4xKqIipuNxAJ-auq1Uxpw95cPpcgGXUTGe1X_qrid4qININLGZw5mSnk4mLNE45dg9S1bAuzJcBLaRPXCn1OdFIvPPVXf4D3T1TN0N2c5v8NUHOlA84ta6xiIeUfrQ7GtG6kgpe2xnYsJel4beq9Tp2USBquwwlw-kV1i4P010NE4eA')`,
                                }}
                            /> */}
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

            <section className={styles.stories_section}>
                <div className={styles.stories_header}>
                    <h2 className={styles.stories_title}>Nossas Histórias</h2>
                    {/* <a href="#" className={styles.view_all_link}>
                        Ver todas <span className="material-symbols-outlined">arrow_forward</span>
                    </a> */}
                </div>

                <div className={styles.stories_grid}>
                    {stories.map((story, index) => (
                        <Link href={`/blog/${story.id}`} onClick={scrolToTop} key={index} className={styles.story_card}>
                            <div className={styles.story_image_wrapper}>
                                <div
                                    className={styles.story_background}
                                    style={{
                                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%), url('${story.imageUrl}')`,
                                    }}
                                />
                                <div className={styles.story_overlay}>
                                    <span className={styles.category_badge}>{story.category}</span>
                                    <h3 className={styles.story_title}>{story.title}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Blog;