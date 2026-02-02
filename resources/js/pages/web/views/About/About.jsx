import React from 'react';
import styles from './About.module.css';
import logo from '../../assets/bear.png'
import WebLayout from '../../layout';
import Banner from '../../components/Banner/Banner';

const About = () => {

    return (
        <div>
            <Banner title={'Sobre Nós'} />

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.grid_two_columns}>
                        <div className={styles.content_left}>
                            <h2 className={styles.section_title}>Somos Deividi & Paula</h2>
                            <p className={styles.section_subtitle}>Um casal apaixonado por viagens, histórias e pessoas.</p>
                            <div className={styles.text_content}>
                                <p>
                                    Em 2023, decidimos deixar nossos trabalhos convencionais Paula,
                                    farmacêutica; Deividi, da área comercial, e também uma vida estável e
                                    feliz que, aos poucos, já não fazia mais sentido para nós. Fomos
                                    percebendo que a estrada nos convidava a viver algo diferente, uma
                                    vida mais viva, mais presente.
                                </p>
                                <p>
                                    O Vivendo em Viagem nasceu em nossos corações não apenas para
                                    compartilhar fotos ou roteiros incríveis, mas para dividir com o mundo a
                                    experiência de viver a vida que sempre sonhamos.
                                </p>
                                <p>
                                    Para nós, viajar é um profundo processo de autoconhecimento.
                                    Deixamos para trás a rotina convencional para abraçar o mundo como
                                    nossa casa. A estrada nos transformou a ponto de entendermos que a
                                    felicidade mora no simples, que o outro é essencial, que respeitar e
                                    apreciar culturas e histórias nos torna mais sábios e que estar presente
                                    é o que realmente nos mantém vivos.
                                </p>
                            </div>
                        </div>

                        <div className={styles.image_container}>
                            <div className={styles.polaroid}>
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDalBudIXT_YVVfXS0kp9NkNFg7jgHumMjZ-Bm9Xh7Pjy4b-xbTqSvxdCNxTtoj26-7AbxZ7BQY1AOyvl6e0JLMt7Jf2B6Zb_UuUtXybMsOmsc9NorCu32sL52EBVe08ONtiwd0dIa-JA_HsTpaYDKSAGR7LLTUgJBOZTyA8U5z9fWKI40FbU0YXgD_auQXq2mlUPeiKb00QZaPgHrZvOPjpwv5W7t-tU9eAZmzDkoX1QPtgRg7STiVsoh2urd3cAb0UKHHtSD-E0"
                                    alt="Deividi e Paula em uma de suas viagens"
                                    className={styles.main_photo}
                                />
                            </div>
                            <div className={styles.decor_circle}></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.section} ${styles.border_top}`}>
                <div className={styles.container}>
                    <div className={styles.grid_two_columns}>
                        <div className={styles.gallery_grid}>
                            <div className={styles.gallery_column}>
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCdi7Ku3O5Sm7pQEDrCkavp-K9hh3qu3fFk99W5EHaXluqQ3PjQzz0pm6hb-HlKV09aQhAbHjMwVL99i3f2iXevzCFMhGuGk2o3VU8ygNBgoLknoJMZZLVO3QRAU_1Vg64p_-Wxzlu1lw3cZQ2yQ8ZriJA5TSg0HnIarLB9Swdlv-1b8S0przrqSu41c9esc_8qzN8ojXGobUtAm85XFZuqElsmYcpjvjkG-GoVfM-tsJpyk9pQuMYUUhME2KLpSZmUDG9Ch2Fv-U"
                                    alt="Montanhas"
                                    className={styles.gallery_image}
                                />
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK-sy9Sz9nF8OWao7wsa1Ms9Q65CARVoOdane1HK5QsAkJWUlN4plJ4-Np5ha6jdROMe__UH7zpLJ6Bsx4-XWy7ezOAGjW7cz6RFGPWtrdoJMgQIheTWY4FW9n_wzj53LUgGMWEN6HVDpmm59KcsKviFnXZh__XfRb0QSVSuMD-_QS-00TOtHRmitaqIdwJkQWfCVXd93R2Zoc0kgH14V0Dvw_xxatXOsocT9VIzby_XYVKwnI-a5_hG-XdLqSD9fjFgeeOLzhzKw"
                                    alt="Estrada cênica"
                                    className={styles.gallery_image_tall}
                                />
                            </div>
                            <div className={styles.gallery_column}>
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ29bk2SP206pKpTMZvT_X9HTTReXRVvNIQ13_jWkbXblkwbcmqNhF3PdmuL_YGtSFV3Eh_FgoY1Nw-3MznF15sxGqQQHOz2EY6TiuHjG-fQ1sBYhh03kVLqMe7UNXXq9SNYLdvtFgdUCuXxPQLybX0Mwdj0mwWS6SO2_QViz0H8ULmHBXJnoyJBKM0OJhz3O40CI3_w8c5zy6E87bdBVCRFmjN0WOTUDuJ_8NhjzJEVKN056_DakbPocntzq3I-MMttvp-2Hh-Pc"
                                    alt="Lago sereno"
                                    className={styles.gallery_image_tall}
                                />
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDalBudIXT_YVVfXS0kp9NkNFg7jgHumMjZ-Bm9Xh7Pjy4b-xbTqSvxdCNxTtoj26-7AbxZ7BQY1AOyvl6e0JLMt7Jf2B6Zb_UuUtXybMsOmsc9NorCu32sL52EBVe08ONtiwd0dIa-JA_HsTpaYDKSAGR7LLTUgJBOZTyA8U5z9fWKI40FbU0YXgD_auQXq2mlUPeiKb00QZaPgHrZvOPjpwv5W7t-tU9eAZmzDkoX1QPtgRg7STiVsoh2urd3cAb0UKHHtSD-E0"
                                    alt="Floresta"
                                    className={styles.gallery_image}
                                />
                            </div>
                        </div>

                        <div className={styles.content_right}>
                            <h2 className={styles.section_title}>Queremos te inspirar</h2>
                            <div className={styles.text_content}>
                                <p>
                                    Nossa missão é mostrar que uma vida nômade é possível. Através de
                                    nossos relatos, queremos inspirar você a buscar sua própria liberdade,
                                    seja ela em uma viagem de final de semana ou em uma mudança
                                    radical de estilo de vida.
                                </p>
                                <p>
                                    Acreditamos que grandes mudanças não começam com muito, mas
                                    com a decisão de dar o primeiro passo.
                                </p>
                                <p>
                                    Por isso, compartilhamos nossas experiências, aprendizados e tudo o
                                    que fomos descobrindo ao longo do caminho, mostrando que é possível
                                    viajar com consciência, respeito e simplicidade. Se o seu desejo é
                                    colocar o pé na estrada, queremos caminhar com você. Dividimos nosso
                                    conhecimento para ajudar a transformar o sonho da viagem em algo
                                    real, possível e verdadeiro
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.community_section}>
                <div className={styles.container}>

                    <div className={styles.logo_container}>
                        <img src={logo} alt="" className={styles.community_logo} />
                    </div>


                    <h2 className={styles.community_title}>Comunidade Vivendo em Viagem</h2>

                    <p className={styles.community_text}>
                        Criamos a Comunidade Vivendo Em Viagem para conectar pessoas que amam viajar e querem aprender mais sobre esse
                        estilo de vida consciente e transformador.
                    </p>

                    <div className={styles.video_wrapper}>
                        <div className={styles.video_container}>
                            <div className={styles.video_frame}>
                                <iframe
                                    className={styles.video_thumbnail}
                                    src="https://www.youtube.com/embed/FYmBQg9KrHM"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                {/* <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBqx0u2gxCeg9YqXsI8SThFWhfsAaSfnP-AUE1XOgKyykhBLpwD3PoyiZ6SRufuzFekS312wwAz6tE1WhEDbcsgM4L0dM1-nbe2nwG-6uGR8W8htSMvbLGRsLo0B4iLVyVy7OqUTqI2p1NRI_sefpsVBXC7K_rqtrF1GC2S3DYxThSF9X6jo8KZrL4YdT4VCkB9YuXrfV2QLmloecSHlTjTigv8zts8BsRYVG90-idl8zW6Z3qbZ7_xIeBREGs8Pts9NVx4nyFqq4"
                                    alt="Thumbnail do vídeo da comunidade"
                                    className={styles.video_thumbnail}
                                /> */}
                                {/* <div className={styles.play_overlay}>
                                    <button className={styles.play_button}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="36" viewBox="0 0 30 36" fill="none">
                                            <path d="M10 26.75V9.25L23.75 18L10 26.75ZM12.5 22.1875L19.0625 18L12.5 13.8125V22.1875Z" fill="white" />
                                        </svg>
                                    </button>
                                </div> */}
                                {/* <div className={styles.video_title_overlay}>
                                    <h3>Por que se tornar um apoiador do Vivendo...</h3>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className={styles.cta_wrapper}>
                        <a href="#" className={styles.cta_button}>
                            Quiero Saber Mais
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

About.layout = page => <WebLayout>{page}</WebLayout>

export default About;