import React from 'react';
import styles from './Wallpaper.module.css';
import Footer from '../../components/Footer/Footer';
import Navbar from "../../components/Navbar/Navbar";
import { useAppearance } from "@/hooks/use-appearance";

const wallpapers = [
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAEzIx4hT_EctxBPjyiVSU6IVJW-SfPUGN9CQcRCzo5D00gyt956vJtP4zByQRSD2BBCnwbuQcXO2qNlqhaec5UgueoJecvvHxRw0JbVYj2DTo5sJA8O-nN5vhUIqfe-MPp-yBLjnv78gZyTX3i9f5nSQPmCc8iFnV5ilpO-R0moOz0b-uRg0qjA067b0ZYHUIN8HldszdjVmWNNhcIf8LgeeCCGvEbycb09Bdyx1xByXQ-keitZsZG0FhppSl79UQ1KuC6TDzoGE",
        alt: "Mountain sunset wallpaper",
        isLocked: false,
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvM9HfdyP84QWG_WnHHCpMIsOLgcGlXBTtKh1t02FChh9Ry2G0fyLnIIhaWX82ub0FtcPg0nAmclI_UkJuVZim1EtfiVjibc5hdI6w3RZ4UGHFrYr6U__-qU_IKRS2QoOposVqN2hIvYj6UiOAW2QfQEff6ft2xwG6JcqkzFEKLZLc05sqp39B90lUYS8l851QCY3HyeuZg_ssDy_Uyyde0E8bdCJDrFWM-9QO6y61_7m_wJEkxcZlGngswghLlu8NNWDH4Mh-YSk",
        alt: "Lake in Dolomites blurred",
        isLocked: true,
        lockText: "Junte-se à Nossa Comunidade",
        lockSubtitle: "EXCLUSIVO PARA MEMBROS",
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9tP3zmCZkK0ZqTgNFHp4cz3QCUH2ZjNIIaO-7a19sRdDsDSY735VSjdEk4SxudFaJbREZT-lVkCcDVcFwqPkfdADQKag4lkhPjDjqgFMQeOIMSxFbbstKb6BiBxylPPH1JBfo1ZhJ7qqlqSzK8KhE-8yjyyhQeHBljhoxWvYNupruckpIK1w47REbqrVG4j1KrJS5pEH3kLQkprK5Cj6Y2aVjiQLumWhm_gvW4ghmmXRW9mb6bIuThW9IKhaKr781RnASa8FFs6k",
        alt: "Calm lake wallpaper",
        isLocked: false,
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh9DfMo9HYNcPboPUpTmneA1DN0ZAw0EVVB41b8G0Iw73_GLxWNoAv9kR5VAElHpXlmm3rx4e4JeiXTbOXz8xdRqKWdW-iyQ8VOTqEg49thz-rxFbYhwV83cfTxI8Se1hFxic-0ub45OmjWIf8sSd5NyIc3f3LxBK4sZF5y1RgyCsycA-FjmGwAlMbJoc4exVznG4fpTBOTbw40VSozzKA-xneVi3kWafu0g4FP_CaKcJFsOBqj8jKCIY58JUNZ6e8GinODfASn20",
        alt: "Forest trail wallpaper",
        isLocked: false,
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6u-mQiUvD5aC28YpbUZmwoYqsiSbbwQVEgsHdvIlgrpwt3xApR8BDjRLZ6gZ0cjaHAqPc-pbFA6AkV16xhuCmceGQiUOVx7d73zvSUjFkYzG1rFbQx6e_urAXvZEoOLCU3ZsUiRk1H_F-LW33j_ap02H0i-SFT6rMbF-p5GK52orzkefcytF8nVFi35v1SIS9g6YfKocR6mAaAmRr_ky7urSAhtnCwSh3o8AEB_BlV2UcPr3NaTiMxebnkerKYV2DcRILLc7Sces",
        alt: "Valley blurred",
        isLocked: true,
        lockText: "Junte-se à Nossa Comunidade",
        lockSubtitle: "EXCLUSIVO PARA MEMBROS",
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeEHUVtSylEilViOUDt8EYQZPc4VJJcYA_cM9n2U1xDkyE9E15t7YCr-3SBe9woZRfSlGwmvYXgqWjTl61nBW_HwKr78nSnwZceHenvXQzfqayzciHrBdoqSDUH4TA-JQydFf7CcTF0pOGw2fqo3Se_Fd617BMx79BiNHso1zPtamLVG2QU3hYQaiSTd-9uc1w7N_DR0Q36Am3z_zC04lF_vKGF8HkkOrvmwtpUeIbed2XvoInfPLMuexH-DXk-G3IJyz1WxfUXzI",
        alt: "Mountain cabin wallpaper",
        isLocked: false,
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRJI3_FxUWWXeOEQa4po3Vuul97PSBLS5JAMMuReoKISlqLeS8UpFV105Azdh_X_GmH_mTnv56NAsOio1aKbfkh3uwJn0Ms5Ww0T1DKYMFt7jZS_Er34pPnPiBOL0rsnXMOtcKeVg_G7B_Mmm3PKGtONzrqhmGO3aL4emu9xVUMqdsgZd_WPxjJH8_dIKlLb98jOGgVuzv2xW3wKw8ScMLvk6V5Zza8lsLlAhEyWeCkNnI6TVJljcVgvFGTl8rBLG4p2o1bVyIFfU",
        alt: "Mist mountain blurred",
        isLocked: true,
        lockText: "Junte-se à Nossa Comunidade",
        lockSubtitle: "EXCLUSIVO PARA MEMBROS",
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuClVcr2WaiSuxfBIOvOIyU9BHI8oITgh9lQbzOyA7ZoBFvQEOjFJjEorVXiJIsLwuTjepM9o5at2VOrre9048Yk3VQ4bhlHuF7fEcPlSkhRWKRhe-E4qgBmc8mjiXsGA1yYBUHcI9mjiYKSXJP06qF1hULk9Z6gPlTbZLFMdaYCKkk2z54kvy6Wp1W55eXjtLZFwkNl8Jjm4Ioy20luVMTDfwPLvimO8AZ79EM-NjUz5nhSjBaMHfm9tA-x2n4oFDBZPSQvim14Hpo",
        alt: "Yosemite wallpaper",
        isLocked: false,
    },
];

const Wallpaper = () => {
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
                    <h1 className={styles.hero_title}>Wallpaper</h1>
                    <p className={styles.hero_subtitle}>
                        Sinta a jornada em cada clique
                    </p>
                </div>
                <div className={styles.scroll_indicator}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#fff" />
                    </svg>
                </div>
                <div className={styles.filter}></div>
            </section>
            {/* <header className={styles.hero_header}>
                <img
                    src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="High impact landscape traveler at waterfall"
                    className={styles.hero_background}
                />
                <div className={styles.hero_overlay}></div>

                <div className={styles.hero_content}>
                    <h1 className={styles.hero_title}>Wallpaper</h1>
                    <p className={styles.hero_subtitle}>
                        Sinta a jornada em cada clique
                    </p>
                </div>

                <div className={styles.scroll_indicator}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#fff" />
                    </svg>
                </div>
            </header> */}

            <section className={styles.intro_section}>
                <h2 className={styles.intro_title}>Conecte-se com a Estrada</h2>
                <p className={styles.intro_text}>
                    Somos viajantes compartilhando experiências reais na estrada, explorando destinos com olhar consciente e trazendo
                    a paz do caminho para a palma da sua mão. Baixe nossas artes exclusivas e leve a liberdade com você.
                </p>
                <a href="#" className={styles.community_button}>
                    Junte-se à nossa comunidade
                </a>
            </section>

            <main className={styles.gallery_container}>
                <div className={styles.wallpaper_grid}>
                    {wallpapers.map((wallpaper, index) => (
                        <div
                            key={index}
                            className={`${styles.wallpaper_card} ${wallpaper.isLocked ? styles.locked : ''}`}
                        >
                            <img
                                src={wallpaper.src}
                                alt={wallpaper.alt}
                                className={`${styles.wallpaper_image} ${wallpaper.isLocked ? styles.blurred_image : ''
                                    }`}
                            />

                            {wallpaper.isLocked ? (
                                <div className={styles.lock_overlay}>
                                    <svg className={styles.lock_icon} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <h3>{wallpaper.lockText}</h3>
                                    <div className={styles.separator_line}></div>
                                    <p>{wallpaper.lockSubtitle}</p>
                                </div>
                            ) : (
                                <>
                                    <div className={styles.hover_gradient}></div>
                                    <button className={styles.download_button}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M5.625 15C5.625 14.5858 5.28921 14.25 4.875 14.25C4.46079 14.25 4.125 14.5858 4.125 15H5.625ZM4.875 16H4.125H4.875ZM19.275 15C19.275 14.5858 18.9392 14.25 18.525 14.25C18.1108 14.25 17.775 14.5858 17.775 15H19.275ZM11.1086 15.5387C10.8539 15.8653 10.9121 16.3366 11.2387 16.5914C11.5653 16.8461 12.0366 16.7879 12.2914 16.4613L11.1086 15.5387ZM16.1914 11.4613C16.4461 11.1347 16.3879 10.6634 16.0613 10.4086C15.7347 10.1539 15.2634 10.2121 15.0086 10.5387L16.1914 11.4613ZM11.1086 16.4613C11.3634 16.7879 11.8347 16.8461 12.1613 16.5914C12.4879 16.3366 12.5461 15.8653 12.2914 15.5387L11.1086 16.4613ZM8.39138 10.5387C8.13662 10.2121 7.66533 10.1539 7.33873 10.4086C7.01212 10.6634 6.95387 11.1347 7.20862 11.4613L8.39138 10.5387ZM10.95 16C10.95 16.4142 11.2858 16.75 11.7 16.75C12.1142 16.75 12.45 16.4142 12.45 16H10.95ZM12.45 5C12.45 4.58579 12.1142 4.25 11.7 4.25C11.2858 4.25 10.95 4.58579 10.95 5H12.45ZM4.125 15V16H5.625V15H4.125ZM4.125 16C4.125 18.0531 5.75257 19.75 7.8 19.75V18.25C6.61657 18.25 5.625 17.2607 5.625 16H4.125ZM7.8 19.75H15.6V18.25H7.8V19.75ZM15.6 19.75C17.6474 19.75 19.275 18.0531 19.275 16H17.775C17.775 17.2607 16.7834 18.25 15.6 18.25V19.75ZM19.275 16V15H17.775V16H19.275ZM12.2914 16.4613L16.1914 11.4613L15.0086 10.5387L11.1086 15.5387L12.2914 16.4613ZM12.2914 15.5387L8.39138 10.5387L7.20862 11.4613L11.1086 16.4613L12.2914 15.5387ZM12.45 16V5H10.95V16H12.45Z" fill="currentColor" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <Footer />
            </main>
        </div>
    );
}

export default Wallpaper;