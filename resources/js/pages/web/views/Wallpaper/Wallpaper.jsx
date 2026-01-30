import React from 'react';
import styles from './Wallpaper.module.css';
import WebLayout from '../../layout';
import { usePage } from '@inertiajs/react';
import Banner from '../../components/Banner/Banner';

const Wallpaper = () => {
    const { wallpapers } = usePage().props;
    const items = Array.isArray(wallpapers?.data) ? wallpapers.data : (Array.isArray(wallpapers) ? wallpapers : []);

    return (
        <div >
            <Banner title={'Wallpapers'} />

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
                    {items.map((wallpaper) => (
                        <div
                            key={wallpaper.id}
                            className={`${styles.wallpaper_card} ${wallpaper.is_locked ? styles.locked : ''}`}
                        >
                            <img
                                src={wallpaper.src}
                                alt={wallpaper.alt || wallpaper.title}
                                className={`${styles.wallpaper_image} ${wallpaper.is_locked ? styles.blurred_image : ''
                                    }`}
                            />

                            {wallpaper.is_locked ? (
                                <div className={styles.lock_overlay}>
                                    <svg className={styles.lock_icon} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <h3>{wallpaper.lock_text}</h3>
                                    <div className={styles.separator_line}></div>
                                    <p>{wallpaper.lock_subtitle}</p>
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
            </main>
        </div>
    );
}

Wallpaper.layout = page => <WebLayout>{page}</WebLayout>

export default Wallpaper;