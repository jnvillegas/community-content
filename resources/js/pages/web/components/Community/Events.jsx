import styles from './Events.module.css';
import { useState } from 'react';
import EventsModal from './EventsModal';

// Datos de eventos en array
const eventsData = [
    {
        id: 1,
        title: 'Expedição Pantanal: A beleza da natureza é o melhor remédio para uma alma inquieta. 🐆',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDOy0xspBf9kHtXXnYFG9r0i5qC1qmVM2lflY2dRpAFF856iDeiZr-nBXI_m2RiYjJiqsJpR96kMmjaZ5wb7ML3lhIkCKULFWnk2hpBnAcf_iADdYtTc4Hr-zy4O1dQqoAJ7PubD0yUS7tVkhyrK1RxVHpQeL15SPb43ZmK09x7l4P6tUm5jKW14_Ss8Rv1eSbaR1KbYFA6S2bXhGsgU5xEzVNFlAHC3kckF_SgoSF9Ozka1HxML2rpXt7attnISn_RPPjrvuzWtk8',
        author: {
            name: 'Paula & Deividi',
            handle: '@vivendoemviagem',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBTvgN5HOwil92wWfO1TN5YXL3POI4Zrn8O2VS99jkeyEOn31WlsjHoKoMKtmV5Y0mDZXq4kUZErY0kbR7VMHVX1QlXK5eCbiuDvUuk110gddc33aR3Zh6OprPmkqFQzcKCfmgqSJXvJyg_K5ww36yDD0CA6WbqCe1vEAZn_oV4PKnnqQcirRfjFu7bHRzw2EA2B38vYKyNThlt0sEZa4NYRpVUWol06gye9ervwuek2hnePH-vr0Jx4J8pFsB-H_kW_Wvg7702DCY',
        },
        likesCount: 12300,
        shares: '250',
        comments: '100',
        date: '15 Out - 22 Out',
        location: 'Pantanal, MS',
        liked: true,
        hasMap: true,
        commentList: [
            { id: 1, user: 'Ana', text: 'Que fotos incríveis! Quero ir também!' },
            { id: 2, user: 'João', text: 'Pantanal é vida! 🐊' },
            { id: 1, user: 'Ana', text: 'Que fotos incríveis! Quero ir também!' },
            { id: 2, user: 'João', text: 'Pantanal é vida! 🐊' },
            { id: 1, user: 'Ana', text: 'Que fotos incríveis! Quero ir também!' },
            { id: 2, user: 'João', text: 'Pantanal é vida! 🐊' },
            { id: 1, user: 'Ana', text: 'Que fotos incríveis! Quero ir também!' },
            { id: 2, user: 'João', text: 'Pantanal é vida! 🐊' },
            { id: 1, user: 'Ana', text: 'Que fotos incríveis! Quero ir também!' },
            { id: 2, user: 'João', text: 'Pantanal é vida! 🐊' },
        ],
    },
    {
        id: 2,
        title: 'Pôr do sol no Jardim de Maytreia. Vem com a gente! ✨ #Veadeiros',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCkZoAMKwBitrw5TT2YSIp3-YCJeGThDTCzBEb3h13g34nLDlurSq6WEeLWyU-BwVX_5OZPFqPyZuMusURXveN9ea-DJD548Bd_m3JSnbFr5T4eNDXO5FnDEDDEiPkG3zh9n_U2KIXEn1dxb0KrIP2Vvpygu26BUcQUwHz-3dujbjwI5ExCLKWVRVsJJgOvx1cKrDySILhyE3hNvu6Ewp6D9HuOur17P0d7GSNDiGEZtgeKOwXif7tdtNx-l4moWKWh2j-biX2rJiE',
        author: {
            name: 'Deividi Real',
            handle: '@deividi.real',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuD-s-ibxg1fMBH43n7m7gxcVB6pH2cw02FbuPFn00axtnNbKbB70TeXX2E4ZGfE2poMmcEueB2_rVQP3Hb9t7hCeEAVCL-rbxfowONlVl5C9y0zdb9k5KE7qxzVna6q16Jf-3nPHpNoowI8UzlbbfTZVuYQ3pLrzNcL1DZfmceBTTWeA5B0yM8Xf-RdElQodbHwfET61QNQB-ILcqdsvhhkfOcIMaJENL557wnz4gEhS1MpxQcARx-rtr6Xh8Wjq_130iGUUKAhC4I',
        },
        likesCount: 1300,
        shares: '89',
        comments: null,
        date: '05 Nov - 08 Nov',
        location: 'Alto Paraíso, GO',
        liked: false,
        hasMap: false,
    },
    {
        id: 3,
        title: 'Em busca da Aurora Boreal. Uma jornada épica pela terra do gelo e fogo. ❄️🔥',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCJmD1L0i5dfHALIjslzsMasFeKfKb_o14-LqxXOEz6jU9b0Vh39I1Uurm0lRELrZHnevcL-8Az6QGZHr5E70cUXXF8pykMwBGO35ZciNqhGqwUwMLClj_5llorFvgvj8jz7Vs-SQHhfAyBmXw95Wmx9DnchoZVW89EqtQZ4_7U7m6G5buoe8m0K7GBLjKXAkAyQ1HfhEjXL-oFh6Dmb6q_jaUwnb-VVlxy3WT87J_Vsgw6LX4FrrnfPgzI7QKWEwHKDjeo1IUiQHI',
        author: {
            name: 'Time Vivendo em Viagem',
            handle: 'Internacional',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBTvgN5HOwil92wWfO1TN5YXL3POI4Zrn8O2VS99jkeyEOn31WlsjHoKoMKtmV5Y0mDZXq4kUZErY0kbR7VMHVX1QlXK5eCbiuDvUuk110gddc33aR3Zh6OprPmkqFQzcKCfmgqSJXvJyg_K5ww36yDD0CA6WbqCe1vEAZn_oV4PKnnqQcirRfjFu7bHRzw2EA2B38vYKyNThlt0sEZa4NYRpVUWol06gye9ervwuek2hnePH-vr0Jx4J8pFsB-H_kW_Wvg7702DCY',
        },
        likesCount: 28000,
        shares: '1.2k',
        comments: null,
        date: '12 Jan - 22 Jan',
        location: 'Reykjavik, Islândia',
        liked: true,
        hasMap: true,
    },
    {
        id: 4,
        title: 'Desafio Fitz Roy: Para quem busca superar limites nas montanhas. 🏔️',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBmGDnQnBeCoklL3utbNmFjnfY6vCqm7BjgPVhSuIAKmKJm-W0KX_xbe9GHBrXoMR5cqdhRvYyBw_umWLVhRIt-8xfdxJ5lYB6VnmFCOWjKDzgzFvCYA3G-0GDfuz60bkF_YuSi4g_XOFguZEtxFQBGFDOUXe8o_lp7QYoyPAAF7piT7DM8WKmFh0zeQIe-ECOzvO1-ppalXgVjcxrjXFqU2vjURzCL8Vra0M0LG7InJ4Qb0JJothdQa9BPNS0aaC2B2vN7fh5P-qs',
        author: {
            name: 'Marina Silva',
            handle: '@marina.trekking',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCwr5XDxC01mjX8MmZHjkp3CPKfWvb71OslweqRvGcENwRJkRqfYh86hicrRmttPHEwi3f2imeyILHcCuD6aVx933uXiVkCuQ4kEDX74pNyOjt0Cq1pdatzn04tf0xEL13mTFruUjN-HG6i0N5BL2hNJgznDCdhpuCJC7KpD0E1M-8ukc9BztOLFLc8IFZ72KmIz1iqNp322tC21VJlvvLBNn8ZwOpFs-LCLm4_CJVGUhvQA7oMk7QB20N_qyCJjVecxlAHqCGJtJs',
        },
        likesCount: 1500,
        shares: null,
        comments: null,
        date: '20 Fev - 28 Fev',
        location: 'El Chaltén, AR',
        liked: false,
        hasMap: false,
    },
    {
        id: 5,
        title: 'Workshop de Fotografia de Viagem: Capture a alma do destino. 📸',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBAbsWHeGfZgQDsGGEQbJ15Hl6pMX1VSmJlYiZifS5K_BxOOyjd2VwDhxCr183n5jLsc2ifjsMOGhPdanbcvdHIysbTr4_3Osex91UmBDH3XnrwdJ0qvA9YRmk4qYxX0FIs1aLF5R-Ah3pBwHl_TD3LCZJOHq04VsGMssnnCDW6pRp9qEDV5U8gLWVkKIes12Hu4tJTEg8vmFv3HyynD-3udnmpQ6nxHSjc6YqQiQ6nWTBHH1Az92qAVLxgAd2ziJkBelq2Vd5Jg4s',
        author: {
            name: 'Ricardo M.',
            handle: '@rm.fotos',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDe_3cmm8lMLqEsLLKWQGTmaiKBwGI7P-uBfhmdHuR3D55wpk5creVL4oPtLSosXYUzik88qNcoA3NRFUpBLS4pH8HwJQK7cDTXOTplsfAD8sekNZDjN2HKoakjnpVYPH0B4nhmXSIATUixLGoXghyjpZJEy1JG3m0RYsIOyBJyWsig6S28ndd6lrxg8TQDH3jGwQMUkX81BBGLDC-1UfAny7E4BTjLtBGfGtN_ura2GvFTE5NjZ-zrzukaovfdvJhrJIgZ8vU8sqo',
        },
        likesCount: 0,
        shares: null,
        comments: null,
        date: '10 Mar - 12 Mar',
        location: 'Paraty, RJ',
        liked: false,
        hasMap: true,
    },
];

const Events = () => {
    const [events, setEvents] = useState(eventsData);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const toggleLike = (eventId) => {
        console.log("hi");

        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === eventId
                    ? { ...event, liked: !event.liked }
                    : event
            )
        );
    };

    const openModal = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    const formatLikes = (count) => {
        if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
        if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
        return count.toLocaleString();
    };


    return (
        <div className={styles.events_container}>

            {selectedEvent && (
                <EventsModal event={selectedEvent} onClose={closeModal} formatLikes={formatLikes} toggleLike={toggleLike} />
            )}

            <header className={styles.header}>
                <h1 className={styles.title}>Nossos Eventos</h1>
            </header>

            <main className={styles.main}>
                <div className={styles.masonry_grid}>
                    {events.map((event) => {
                        const displayedLikes = event.liked ? event.likesCount + 1 : event.likesCount;

                        return (

                            <div key={event.id} className={styles.masonry_item}>
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className={styles.event_image}
                                />

                                <div className={styles.glass_overlay}>
                                    <div className={styles.actions_column}>
                                        <button className={styles.action_button} onClick={() => toggleLike(event.id)}>
                                            {event.liked ? (
                                                <svg className={styles.liked} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                                                </svg>

                                            ) : (
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                                </svg>

                                            )}
                                            <span className={styles.action_count}>{formatLikes(displayedLikes)}</span>
                                        </button>

                                        <button className={styles.action_button} onClick={() => openModal(event)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M4.82698 7.13803L5.27248 7.36502L4.82698 7.13803ZM5.2682 18.7318L5.62175 19.0854H5.62175L5.2682 18.7318ZM17.862 16.173L17.635 15.7275L17.862 16.173ZM19.173 14.862L18.7275 14.635L19.173 14.862ZM19.173 7.13803L18.7275 7.36502V7.36502L19.173 7.13803ZM17.862 5.82698L18.089 5.38148V5.38148L17.862 5.82698ZM6.13803 5.82698L6.36502 6.27248L6.13803 5.82698ZM7.20711 16.7929L7.56066 17.1464L7.20711 16.7929ZM5 10.3C5 9.45167 5.00039 8.84549 5.03921 8.37032C5.07756 7.90099 5.15089 7.60366 5.27248 7.36502L4.38148 6.91103C4.17609 7.31413 4.08593 7.75771 4.04253 8.28889C3.99961 8.81423 4 9.46817 4 10.3H5ZM5 11.5V10.3H4V11.5H5ZM4 11.5V16.5H5V11.5H4ZM4 16.5V18.4136H5V16.5H4ZM4 18.4136C4 19.26 5.02329 19.6838 5.62175 19.0854L4.91465 18.3782C4.91754 18.3753 4.92812 18.368 4.94323 18.3654C4.9556 18.3632 4.96421 18.3654 4.96913 18.3674C4.97406 18.3695 4.98164 18.374 4.98888 18.3843C4.99771 18.3968 5 18.4095 5 18.4136H4ZM5.62175 19.0854L7.56066 17.1464L6.85355 16.4393L4.91465 18.3782L5.62175 19.0854ZM14.7 16H7.91421V17H14.7V16ZM17.635 15.7275C17.3963 15.8491 17.099 15.9224 16.6297 15.9608C16.1545 15.9996 15.5483 16 14.7 16V17C15.5318 17 16.1858 17.0004 16.7111 16.9575C17.2423 16.9141 17.6859 16.8239 18.089 16.6185L17.635 15.7275ZM18.7275 14.635C18.4878 15.1054 18.1054 15.4878 17.635 15.7275L18.089 16.6185C18.7475 16.283 19.283 15.7475 19.6185 15.089L18.7275 14.635ZM19 11.7C19 12.5483 18.9996 13.1545 18.9608 13.6297C18.9224 14.099 18.8491 14.3963 18.7275 14.635L19.6185 15.089C19.8239 14.6859 19.9141 14.2423 19.9575 13.7111C20.0004 13.1858 20 12.5318 20 11.7H19ZM19 10.3V11.7H20V10.3H19ZM18.7275 7.36502C18.8491 7.60366 18.9224 7.90099 18.9608 8.37032C18.9996 8.84549 19 9.45167 19 10.3H20C20 9.46817 20.0004 8.81423 19.9575 8.28889C19.9141 7.75771 19.8239 7.31413 19.6185 6.91103L18.7275 7.36502ZM17.635 6.27248C18.1054 6.51217 18.4878 6.89462 18.7275 7.36502L19.6185 6.91103C19.283 6.25247 18.7475 5.71703 18.089 5.38148L17.635 6.27248ZM14.7 6C15.5483 6 16.1545 6.00039 16.6297 6.03921C17.099 6.07756 17.3963 6.15089 17.635 6.27248L18.089 5.38148C17.6859 5.17609 17.2423 5.08593 16.7111 5.04253C16.1858 4.99961 15.5318 5 14.7 5V6ZM9.3 6H14.7V5H9.3V6ZM6.36502 6.27248C6.60366 6.15089 6.90099 6.07756 7.37032 6.03921C7.84549 6.00039 8.45167 6 9.3 6V5C8.46817 5 7.81423 4.99961 7.28889 5.04253C6.75771 5.08593 6.31413 5.17609 5.91103 5.38148L6.36502 6.27248ZM5.27248 7.36502C5.51217 6.89462 5.89462 6.51217 6.36502 6.27248L5.91103 5.38148C5.25247 5.71703 4.71703 6.25247 4.38148 6.91103L5.27248 7.36502ZM7.56066 17.1464C7.65443 17.0527 7.78161 17 7.91421 17V16C7.51639 16 7.13486 16.158 6.85355 16.4393L7.56066 17.1464Z" fill="currentColor" />
                                                <path d="M8.5 9.5L15.5 9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.5 12.5L13.5 12.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {event.comments && <span className={styles.action_count}>{event.comments}</span>}
                                        </button>

                                        <button className={styles.action_button}>
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className={styles.author_row}>
                                        <img
                                            src={event.author.avatar}
                                            alt={event.author.name}
                                            className={styles.author_avatar}
                                        />

                                        <div className={styles.author_info}>
                                            <h3 className={styles.author_name}>{event.author.name}</h3>
                                            <span className={styles.author_handle}>{event.location}</span>
                                        </div>
                                    </div>

                                    <p className={styles.event_title}>{event.title}</p>

                                    <div className={styles.event_meta}>
                                        <div className={styles.date}>
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                                            </svg>
                                            {event.date}
                                        </div>

                                        <div>
                                            {event.hasMap && (
                                                <span className={styles.location_tag}>
                                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd" />
                                                    </svg>

                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main >
        </div>
    );
}

export default Events;