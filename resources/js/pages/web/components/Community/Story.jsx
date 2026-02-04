import React, { useState } from 'react';
import styles from './Story.module.css';

const storiesData = [
    {
        id: 1,
        username: 'Deividi & Paula',
        time: '2h',
        avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAp4CULHDtgX4mUMJsCF3kuOUF1T9Z1BOr6qHySXK_d-tQqOrSuf5_xCkJ6Mbm5D8FnCkR863kO8QE8KzrdMUAbR1m4lFaYMMUm8mGf6SHklZUXl7-t1mxD0SUDRMcfCn8WIKauNqzmDzRf7_ZugKfx61BGrLO8NH2ksT__su0XvfNWxQoJtv9WKYDxGxv5gEH0UFdkipQTZ6V52FWVxmy-0rBbtuEg28aWGmFJOcnO2_fkOjXV_kF_gWyn84lXXv-NXcjYBwQnXpo',
        background:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAn6QqIx0MpmeNqGXOqA_NxlVUkJjHQVbf6Io2fXQDj1uKikES_84EGKml9pUoWBPqmZ9G-GyvsslGmY0OMM7yeJ7gMvPbJhCMGR9s1iS0z83nmI6ZHH3xnu9iM_TqUbgSSs4BcFKsMqTufwLXjvoWBk2S1iZb1-t0JlRNFm0RRfpVu5585sqAXAX5_PZO7ZudsumGcM1GNtC-fSx5NZSSnuYN4dsw3QUjAwIoQtBMrAaLGG4GqqGxL3ZoFQjf_bz7J0bZk_1uR0hA',
        blurBg:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAn6QqIx0MpmeNqGXOqA_NxlVUkJjHQVbf6Io2fXQDj1uKikES_84EGKml9pUoWBPqmZ9G-GyvsslGmY0OMM7yeJ7gMvPbJhCMGR9s1iS0z83nmI6ZHH3xnu9iM_TqUbgSSs4BcFKsMqTufwLXjvoWBk2S1iZb1-t0JlRNFm0RRfpVu5585sqAXAX5_PZO7ZudsumGcM1GNtC-fSx5NZSSnuYN4dsw3QUjAwIoQtBMrAaLGG4GqqGxL3ZoFQjf_bz7J0bZk_1uR0hA',
        title: 'Hiking the Andes',
        text: 'Exploring the winding trails of the Peruvian mountains today. The altitude is high, but the view is worth it.',
    },
    {
        id: 2,
        username: 'Deividi & Paula',
        time: '1d',
        avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAp4CULHDtgX4mUMJsCF3kuOUF1T9Z1BOr6qHySXK_d-tQqOrSuf5_xCkJ6Mbm5D8FnCkR863kO8QE8KzrdMUAbR1m4lFaYMMUm8mGf6SHklZUXl7-t1mxD0SUDRMcfCn8WIKauNqzmDzRf7_ZugKfx61BGrLO8NH2ksT__su0XvfNWxQoJtv9WKYDxGxv5gEH0UFdkipQTZ6V52FWVxmy-0rBbtuEg28aWGmFJOcnO2_fkOjXV_kF_gWyn84lXXv-NXcjYBwQnXpo',
        background:
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
        blurBg:
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1748&q=80',
        title: 'Van Life Sunset',
        text: 'Nada mejor que ver el atardecer desde el techo de la casa rodante. Este lugar en la Patagonia es mágico.',
    },
    {
        id: 3,
        username: 'Deividi & Paula',
        time: '3h',
        avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAp4CULHDtgX4mUMJsCF3kuOUF1T9Z1BOr6qHySXK_d-tQqOrSuf5_xCkJ6Mbm5D8FnCkR863kO8QE8KzrdMUAbR1m4lFaYMMUm8mGf6SHklZUXl7-t1mxD0SUDRMcfCn8WIKauNqzmDzRf7_ZugKfx61BGrLO8NH2ksT__su0XvfNWxQoJtv9WKYDxGxv5gEH0UFdkipQTZ6V52FWVxmy-0rBbtuEg28aWGmFJOcnO2_fkOjXV_kF_gWyn84lXXv-NXcjYBwQnXpo',
        background:
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
        blurBg:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
        title: 'Camping bajo las estrellas',
        text: 'Noche perfecta en la cordillera. Cielo despejado y fogata encendida. No hay nada mejor.',
    },
];

const Story = ({ handleModal }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentStory = storiesData[currentIndex];

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < storiesData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleClose = () => {
        console.log('Cerrar story');
    };

    return (
        <>
            <div className={styles.blur_bg}>
                <div
                    className={styles.blur_bg_image}
                    style={{
                        backgroundImage: `url('${currentStory.blurBg}')`,
                    }}
                />
            </div>

            <div className={styles.story_overlay}>
                <div className={styles.nav_buttons}>
                    <button className={styles.nav_arrow} onClick={handlePrev}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="32" height="32" viewBox="0 0 32 32" version="1.1">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g transform="translate(-258.000000, -1089.000000)" fill="currentColor">
                                    <path d="M281,1106 L270.414,1106 L274.536,1110.12 C274.926,1110.51 274.926,1111.15 274.536,1111.54 C274.145,1111.93 273.512,1111.93 273.121,1111.54 L267.464,1105.88 C267.225,1105.64 267.15,1105.31 267.205,1105 C267.15,1104.69 267.225,1104.36 267.464,1104.12 L273.121,1098.46 C273.512,1098.07 274.145,1098.07 274.536,1098.46 C274.926,1098.86 274.926,1099.49 274.536,1099.88 L270.414,1104 L281,1104 C281.552,1104 282,1104.45 282,1105 C282,1105.55 281.552,1106 281,1106 L281,1106 Z M274,1089 C265.164,1089 258,1096.16 258,1105 C258,1113.84 265.164,1121 274,1121 C282.836,1121 290,1113.84 290,1105 C290,1096.16 282.836,1089 274,1089 L274,1089 Z">
                                    </path>
                                </g>
                            </g>
                        </svg>
                    </button>
                    <button className={styles.nav_arrow} onClick={handleNext}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="32" height="32" viewBox="0 0 32 32" version="1.1">

                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g transform="translate(-310.000000, -1089.000000)" fill="currentColor">
                                    <path d="M332.535,1105.88 L326.879,1111.54 C326.488,1111.93 325.855,1111.93 325.465,1111.54 C325.074,1111.15 325.074,1110.51 325.465,1110.12 L329.586,1106 L319,1106 C318.447,1106 318,1105.55 318,1105 C318,1104.45 318.447,1104 319,1104 L329.586,1104 L325.465,1099.88 C325.074,1099.49 325.074,1098.86 325.465,1098.46 C325.855,1098.07 326.488,1098.07 326.879,1098.46 L332.535,1104.12 C332.775,1104.36 332.85,1104.69 332.795,1105 C332.85,1105.31 332.775,1105.64 332.535,1105.88 L332.535,1105.88 Z M326,1089 C317.163,1089 310,1096.16 310,1105 C310,1113.84 317.163,1121 326,1121 C334.837,1121 342,1113.84 342,1105 C342,1096.16 334.837,1089 326,1089 L326,1089 Z">

                                    </path>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>

                <div className={styles.story_container}>
                    <div
                        className={styles.story_background}
                        style={{
                            backgroundImage: `url('${currentStory.background}')`,
                        }}
                    >
                        <div className={styles.story_gradient} />
                    </div>

                    <div className={styles.story_content}>
                        <div className={styles.progress_bar_container}>
                            {storiesData.map((_, idx) => (
                                <div key={idx} className={styles.progress_segment}>
                                    <div
                                        className={`${styles.progress_fill} ${idx === currentIndex ? '' : idx < currentIndex ? styles.white : ''
                                            }`}
                                        style={{
                                            width: idx === currentIndex ? '100%' : idx < currentIndex ? '100%' : '0%',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className={styles.header}>
                            <div className={styles.avatar_container}>
                                <div
                                    className={styles.profile_avatar}
                                    style={{
                                        backgroundImage: `url('${currentStory.avatar}')`,
                                    }}
                                />
                                <div className={styles.user_info}>
                                    <span className={styles.username}>{currentStory.username}</span>
                                    <span className={styles.time}>{currentStory.time}</span>
                                </div>
                            </div>

                            <div className={styles.header_buttons}>
                                {/* <button className={styles.icon_button}>
                                    <span className="material-symbols-outlined text-[24px]">volume_up</span>
                                </button> */}
                                <button className={styles.icon_button} onClick={handleModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>
                        </div>


                        <div className={styles.main_content}>
                            {/* <h2 className={styles.story_title}>{currentStory.title}</h2> */}
                            {/* <p className={styles.story_text}>{currentStory.text}</p> */}
                        </div>

                        <div className={styles.footer}>
                            <input
                                className={styles.message_input}
                                placeholder="Send a message"
                                type="text"
                            />
                            <div className={styles.action_buttons}>
                                <button className={`${styles.action_button} ${styles.liked}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.993 5.09691C11.0387 4.25883 9.78328 3.75 8.40796 3.75C5.42122 3.75 3 6.1497 3 9.10988C3 10.473 3.50639 11.7242 4.35199 12.67L12 20.25L19.4216 12.8944L19.641 12.6631C20.4866 11.7172 21 10.473 21 9.10988C21 6.1497 18.5788 3.75 15.592 3.75C14.2167 3.75 12.9613 4.25883 12.007 5.09692L12 5.08998L11.993 5.09691ZM12 7.09938L12.0549 7.14755L12.9079 6.30208L12.9968 6.22399C13.6868 5.61806 14.5932 5.25 15.592 5.25C17.763 5.25 19.5 6.99073 19.5 9.10988C19.5 10.0813 19.1385 10.9674 18.5363 11.6481L18.3492 11.8453L12 18.1381L5.44274 11.6391C4.85393 10.9658 4.5 10.0809 4.5 9.10988C4.5 6.99073 6.23699 5.25 8.40796 5.25C9.40675 5.25 10.3132 5.61806 11.0032 6.22398L11.0921 6.30203L11.9452 7.14752L12 7.09938Z" fill="currentColor" />
                                    </svg>
                                </button>
                                <button className={styles.action_button}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Story;