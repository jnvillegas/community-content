import React from 'react';
import styles from './Events.module.css';

const mockPosts = [
    {
        id: 1,
        author: {
            name: 'Lucas Travel',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAw59jlHnkjv_Sy-RKCbzTKCIDtsyES3NiM3w8TopAcpoXBMeSa20EJ8VrZwdJzNFtWRKNM4c8StHsHnF668QXAkY5v_Kt_3I8I4iLK2fcBTuRSO_ptT6M5IVox8zhRm2IXuJ8N8S4Lz6AUBfXoEa9YQcViVhOdQnT5T38B_ePTMTe1xiEpCrBHyP-8WKrVLiEoNomjGq-hex3j1bdcsGusYLPWFPa_Mu4lsq-ir92Jy6jJRXc3AYFupuGw3E9rIZ_6g48cSfBkcRM',
            location: 'El Chaltén, Argentina',
        },
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBMlGIkRQrEKP3Aqi5xyhgJ2h-cDFf_Aizly4jZeYbtw6lRSAiJ2QcE7XhUyi1B0UI9MHm2ohKjdJR8GAenaub51ogavpK6RcVajZhGhJ6B3QDsUTCY8GcX9vXgc1waCZ8hssaPMCSHJTW00OWDiti7sDOtwo9XM4MzUBohgQInBgyIglZBMRmFPH6mZhqXSY7gNTmw6L3C9Y12O9FJOxjwzLr0NXhEx774iOOwEhgonTerXcb5_B57LYAz6D7VCBfki_z78b23wwM',
        likes: 1248,
        commentsCount: 42,
        caption:
            'Que dia incrível na trilha Fitz Roy com a galera da Vivendo em Viagem! A energia foi surreal. 🏔️🇦🇷',
        comments: [
            {
                author: 'Mari_Aventura',
                text: 'As fotos ficaram absurdas! Quero o roteiro!',
            },
            {
                author: 'JoaoVanLife',
                text: 'Top demais! Nos vemos na próxima.',
            },
        ],
        bookmarked: false,
    },
    // {
    //     id: 2,
    //     author: {
    //         name: 'Ana Vanlifer',
    //         avatar:
    //             'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
    //         location: 'Chapada Diamantina, Bahia',
    //     },
    //     image:
    //         'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    //     likes: 856,
    //     commentsCount: 19,
    //     caption:
    //         'Acampamento selvagem com vista para as cachoeiras. Melhor experiência do ano! 🌊⛺',
    //     comments: [
    //         {
    //             author: 'Pedro_Aventureiro',
    //             text: 'Qual equipamento vocês usaram pra esse frio à noite?',
    //         },
    //     ],
    //     bookmarked: true,
    // },
];

const Events = ({ posts = mockPosts }) => {

    return (
        <section className={styles.events_section}>
            <div className={styles.header}>
                <h2 className={styles.section_title}>Expedições da Comunidade</h2>
                {/* <a href="#" className={styles.view_all}>
                    Ver tudo
                </a> */}
            </div>

            {posts.map((post) => (
                <div key={post.id} className={styles.post_card}>
                    <div className={styles.post_header}>
                        <div
                            className={styles.avatar}
                            style={{ backgroundImage: `url('${post.author.avatar}')` }}
                        />
                        <div className={styles.user_info}>
                            <p className={styles.username}>{post.author.name}</p>
                            <p className={styles.location}>{post.author.location}</p>
                        </div>
                        <button className={styles.more_button}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10Z" fill="#000000" />
                                <path d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z" fill="#000000" />
                                <path d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z" fill="#000000" />
                            </svg>
                        </button>
                    </div>

                    <div
                        className={styles.post_image}
                        style={{ backgroundImage: `url('${post.image}')` }}
                    />

                    <div className={styles.actions_bar}>
                        <div className={styles.actions_list}>
                            <button className={`${styles.action_button} ${styles.liked}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.993 5.09691C11.0387 4.25883 9.78328 3.75 8.40796 3.75C5.42122 3.75 3 6.1497 3 9.10988C3 10.473 3.50639 11.7242 4.35199 12.67L12 20.25L19.4216 12.8944L19.641 12.6631C20.4866 11.7172 21 10.473 21 9.10988C21 6.1497 18.5788 3.75 15.592 3.75C14.2167 3.75 12.9613 4.25883 12.007 5.09692L12 5.08998L11.993 5.09691ZM12 7.09938L12.0549 7.14755L12.9079 6.30208L12.9968 6.22399C13.6868 5.61806 14.5932 5.25 15.592 5.25C17.763 5.25 19.5 6.99073 19.5 9.10988C19.5 10.0813 19.1385 10.9674 18.5363 11.6481L18.3492 11.8453L12 18.1381L5.44274 11.6391C4.85393 10.9658 4.5 10.0809 4.5 9.10988C4.5 6.99073 6.23699 5.25 8.40796 5.25C9.40675 5.25 10.3132 5.61806 11.0032 6.22398L11.0921 6.30203L11.9452 7.14752L12 7.09938Z" fill="currentColor" />
                                </svg>
                                <span className={styles.action_count}>{post.likes.toLocaleString()}</span>
                            </button>

                            <button className={styles.action_button}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M4.82698 7.13803L5.27248 7.36502L4.82698 7.13803ZM5.2682 18.7318L5.62175 19.0854H5.62175L5.2682 18.7318ZM17.862 16.173L17.635 15.7275L17.862 16.173ZM19.173 14.862L18.7275 14.635L19.173 14.862ZM19.173 7.13803L18.7275 7.36502V7.36502L19.173 7.13803ZM17.862 5.82698L18.089 5.38148V5.38148L17.862 5.82698ZM6.13803 5.82698L6.36502 6.27248L6.13803 5.82698ZM7.20711 16.7929L7.56066 17.1464L7.20711 16.7929ZM5 10.3C5 9.45167 5.00039 8.84549 5.03921 8.37032C5.07756 7.90099 5.15089 7.60366 5.27248 7.36502L4.38148 6.91103C4.17609 7.31413 4.08593 7.75771 4.04253 8.28889C3.99961 8.81423 4 9.46817 4 10.3H5ZM5 11.5V10.3H4V11.5H5ZM4 11.5V16.5H5V11.5H4ZM4 16.5V18.4136H5V16.5H4ZM4 18.4136C4 19.26 5.02329 19.6838 5.62175 19.0854L4.91465 18.3782C4.91754 18.3753 4.92812 18.368 4.94323 18.3654C4.9556 18.3632 4.96421 18.3654 4.96913 18.3674C4.97406 18.3695 4.98164 18.374 4.98888 18.3843C4.99771 18.3968 5 18.4095 5 18.4136H4ZM5.62175 19.0854L7.56066 17.1464L6.85355 16.4393L4.91465 18.3782L5.62175 19.0854ZM14.7 16H7.91421V17H14.7V16ZM17.635 15.7275C17.3963 15.8491 17.099 15.9224 16.6297 15.9608C16.1545 15.9996 15.5483 16 14.7 16V17C15.5318 17 16.1858 17.0004 16.7111 16.9575C17.2423 16.9141 17.6859 16.8239 18.089 16.6185L17.635 15.7275ZM18.7275 14.635C18.4878 15.1054 18.1054 15.4878 17.635 15.7275L18.089 16.6185C18.7475 16.283 19.283 15.7475 19.6185 15.089L18.7275 14.635ZM19 11.7C19 12.5483 18.9996 13.1545 18.9608 13.6297C18.9224 14.099 18.8491 14.3963 18.7275 14.635L19.6185 15.089C19.8239 14.6859 19.9141 14.2423 19.9575 13.7111C20.0004 13.1858 20 12.5318 20 11.7H19ZM19 10.3V11.7H20V10.3H19ZM18.7275 7.36502C18.8491 7.60366 18.9224 7.90099 18.9608 8.37032C18.9996 8.84549 19 9.45167 19 10.3H20C20 9.46817 20.0004 8.81423 19.9575 8.28889C19.9141 7.75771 19.8239 7.31413 19.6185 6.91103L18.7275 7.36502ZM17.635 6.27248C18.1054 6.51217 18.4878 6.89462 18.7275 7.36502L19.6185 6.91103C19.283 6.25247 18.7475 5.71703 18.089 5.38148L17.635 6.27248ZM14.7 6C15.5483 6 16.1545 6.00039 16.6297 6.03921C17.099 6.07756 17.3963 6.15089 17.635 6.27248L18.089 5.38148C17.6859 5.17609 17.2423 5.08593 16.7111 5.04253C16.1858 4.99961 15.5318 5 14.7 5V6ZM9.3 6H14.7V5H9.3V6ZM6.36502 6.27248C6.60366 6.15089 6.90099 6.07756 7.37032 6.03921C7.84549 6.00039 8.45167 6 9.3 6V5C8.46817 5 7.81423 4.99961 7.28889 5.04253C6.75771 5.08593 6.31413 5.17609 5.91103 5.38148L6.36502 6.27248ZM5.27248 7.36502C5.51217 6.89462 5.89462 6.51217 6.36502 6.27248L5.91103 5.38148C5.25247 5.71703 4.71703 6.25247 4.38148 6.91103L5.27248 7.36502ZM7.56066 17.1464C7.65443 17.0527 7.78161 17 7.91421 17V16C7.51639 16 7.13486 16.158 6.85355 16.4393L7.56066 17.1464Z" fill="currentColor" />
                                    <path d="M8.5 9.5L15.5 9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.5 12.5L13.5 12.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className={styles.action_count}>{post.commentsCount}</span>
                            </button>

                            <button className={styles.action_button}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g>
                                        <rect width="24" height="24" fill="none" />
                                        <circle cx="7" cy="12" r="2" stroke="currentColor" strokeLinejoin="round" />
                                        <circle cx="17" cy="6" r="2" stroke="currentColor" strokeLinejoin="round" />
                                        <path d="M15 7L8.5 11" stroke="currentColor" />
                                        <circle cx="17" cy="18" r="2" stroke="currentColor" strokeLinejoin="round" />
                                        <path d="M8.5 13.5L15 17" stroke="currentColor" />
                                    </g>
                                </svg>
                            </button>

                            <button className={`${styles.action_button} ml-auto`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className={styles.content}>
                            <p className={styles.caption}>
                                <span className={styles.comment_username}>{post.author.name}</span>
                                {post.caption}
                            </p>

                            {post.comments.length > 0 && (
                                <div className={styles.comment_preview}>
                                    {post.comments.map((comment, idx) => (
                                        <p key={idx} className={styles.comment}>
                                            <span className={styles.comment_username}>{comment.author}</span>
                                            {comment.text}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.comment_input_container}>
                            <input
                                className={styles.comment_input}
                                placeholder="Adicione um comentário..."
                                type="text"
                            />
                            <button className={styles.post_button}>Publicar</button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Events;