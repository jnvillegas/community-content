import React, { useEffect, useRef } from 'react';
import styles from './Community.module.css';
import WebLayout from "../../layout";
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const Community = () => {
    const auth = usePage().props.auth;



    return (
        <>
            <main className={styles.hero_main}>
                <div className={styles.hero_background_wrapper}>
                    <img
                        alt="Consolidated Community Pillars"
                        className={styles.hero_background_image}
                        src="https://images.unsplash.com/photo-1604239282228-6a723984962c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <div className={styles.hero_gradient_overlay} />
                    <div className={styles.hero_vignette_overlay} />
                </div>

                <div className={styles.hero_content}>
                    <h1 className={styles.hero_title}>
                        Momentos que você não vê <br className={styles.hero_title_break} /> em nenhum outro lugar
                    </h1>
                    <p className={styles.hero_subtitle}>
                        Conteúdo privado, treinamento de elite e experiências exclusivas — tudo em um só lugar.
                    </p>

                    <div className={styles.hero_cta_wrapper}>
                        <Link href="/register" className={styles.link}>{!auth.user ? 'Junte-se à comunidade' : 'Veja comunidade'}</Link>
                    </div>
                </div>

                <div className={styles.hero_pillars}>
                    <div className={styles.pillars_container}>
                        <div className={styles.pillar_item}>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clipRule="evenodd" />
                            </svg>
                            <span className={styles.pillar_label}>Histórias</span>
                        </div>
                        <div className={styles.pillar_item}>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.4472 4.10557c-.2815-.14076-.6129-.14076-.8944 0L2.76981 8.49706l9.21949 4.39024L21 8.38195l-8.5528-4.27638Z" />
                                <path d="M5 17.2222v-5.448l6.5701 3.1286c.278.1325.6016.1293.8771-.0084L19 11.618v5.6042c0 .2857-.1229.5583-.3364.7481l-.0025.0022-.0041.0036-.0103.009-.0119.0101-.0181.0152c-.024.02-.0562.0462-.0965.0776-.0807.0627-.1942.1465-.3405.2441-.2926.195-.7171.4455-1.2736.6928C15.7905 19.5208 14.1527 20 12 20c-2.15265 0-3.79045-.4792-4.90614-.9751-.5565-.2473-.98098-.4978-1.27356-.6928-.14631-.0976-.2598-.1814-.34049-.2441-.04036-.0314-.07254-.0576-.09656-.0776-.01201-.01-.02198-.0185-.02991-.0253l-.01038-.009-.00404-.0036-.00174-.0015-.0008-.0007s-.00004 0 .00978-.0112l-.00009-.0012-.01043.0117C5.12215 17.7799 5 17.5079 5 17.2222Zm-3-6.8765 2 .9523V17c0 .5523-.44772 1-1 1s-1-.4477-1-1v-6.6543Z" />
                            </svg>

                            <span className={styles.pillar_label}>Cursos</span>
                        </div>
                        <div className={styles.pillar_item}>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z" clipRule="evenodd" />
                            </svg>

                            <span className={styles.pillar_label}>Produtos</span>
                        </div>
                        <div className={styles.pillar_item}>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z" />
                            </svg>

                            <span className={styles.pillar_label}>Eventos</span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

Community.layout = page => <WebLayout>{page}</WebLayout>

export default Community;