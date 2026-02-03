import React, { useState } from 'react';
import styles from './Stories.module.css';
import Story from './Story';

export default function Stories() {

    const [modal, setModal] = useState(false);

    const stories = [
        {
            label: 'Patagonia',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBda99wBrs-fS7-WN4ViUA9hWeotCJ3iSn_Lm5jJg4ehQjdBfi4iZgBWVQG8GbE9dLQ1-A0EE0TpxkQNxQRmg26uCMtmrBDNQrxqk2CR5gORAXelBA9cM352VufNaPAScx2brgQlOBUynwEv_RragGF2XEoJFffu0drI6JOzikldN83xrCBvHQYKFKKOx8AvQ1oR7yGI9LfH6BOePlEW9mk4j_XDVPwAwk_G_KU-6l_JOmwMhEz_a6MUMDimuYwz22KprmCVdAt_m0',
            alt: 'Patagonia landscape with mountains and lake',
            seen: true,
        },
        {
            label: 'Na Estrada',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLoyt12kDGn937efyLEvrQLIa72upnesQ0sKcCXo3dZsWrWU-MleNvNW8WhptylzNI0qeJAx69u-SAX93_Y4zMqdquiOR0VI5qF3OWowtsp9Ru5K1w5CkiJwchUmw-u7T5HVFHYy9F4o_QQmM6n3F0ZOOKvF4KQ7DD97Z5C_090kIREx5S7IGVr940rFNoF-XqygmXBrNzrTZt3RATd-wNCsSz3vi-dxkuqs4tprF_itgAdvcBpFQSzgTT-n7f0he2uNdMOqyj70s',
            alt: 'Van life on a dusty road',
            seen: false,
        },
        {
            label: 'Camping',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT1q2d0PsLOWIMYk21DABNmD-iNJkn-oPtbEDlza7DGwijcsy1Gw0xIB6Zf_AoRwLBzZSorL6w2Gq1Rh8Iu4rMzJpBIzs9JjguxsecOB5M-OqvrGwZQ-wCB-A2cXh8gd-zhkqXThhN7j937VEpp5NJwdwZiH3eOhhlNPQhBxNLryczR6HaKlXi6q_wceHp7sLSN6xhGZBH1-AT4nGHooTNcMprsR1Ud6xJcgAT2lB249c-9udBapcoCusGLIhX3EAqXZAte8noIf8',
            alt: 'Camping tent under a starry sky',
            seen: false,
        },
        {
            label: 'Gear',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO_Zl6-zT2myaebuIs_sdd6fZiCjOAFDELNxHgGYXJAz2dYoInrNEpPHUaVWJ2Y2qLflAYOltzFvMXIx519npZNOePKxjI6VJjzw4FeLa-1nLNs55AySpFpgDUgaEaNuuh1xR0QmrtlWoG73GhagqJretoKiZk0ib0YU4wLyxeZbNyeHcDgw3grq6F0f2WmfJdh-FWBlYbOKWCDojM2HlcR8yeE-c0hNceIkcQRyUT_qIF_wNFWb9w_pCzQAYgF3fZpEElz4673jM',
            alt: 'Travel gear layout on a table',
            seen: false,
        },
        {
            label: 'Lakes',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDULoUpSNv8o6jJsvkFO8odMKCeEzZviiOCUtX8I2SLKT7QfblXO0CDHunD0pZPaoKBf824yrtr9sbMgs2BHO3hRFt-PqstP4LkGlCHI6hOWgjipQv8Sm1gy5ZIiswtFiuBFhxSQ-UI34nfH2ZDw-cxncho1BgwOXLJ5XnQeJR8BH3BSiVeina71br4463VIP25h5wZk_Xh-cO_DVbIA6FsbP9IQwf6QL6AZbb9-87k4Szmuh2-mgAVBoYOitFJlYQjzwFaxTVtim4',
            alt: 'Crystal clear mountain lake',
            seen: false,
        },
        {
            label: 'Sunset',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkSDzXVZEB4JEP1EDoexoRDLEE3C8Xxa1lA8vleI2Ats8BIUmw7K6xb3c1uYZtoSAF-Qrx_T6NUklUgQotOedyTGQqfQNiXGzLfu1TWf9f3vvHz5PwuWNM4hnmqI4PABrrgkm7cDRpCQrD9JQO4Nl9hhbuSfHDgSEapsvmXt-PcEZs5gVVbM4smhKbUc-hHymMxahpXw85uDG1OCB2oIOy4rrKnmjhKc4didU-jO42voTtyv8GIJ6_CcYAQSQpfvVglgjjYFNbiGk',
            alt: 'Sun setting behind mountains',
            seen: false,
        },
    ];

    const handleModal = () => {
        setModal(!modal)
    }

    return (
        <section className={styles.stories_section}>
            <h2 className={styles.title} >Momentos exclusivos</h2>
            <div className={styles.stories_container}>
                {stories.map((story, index) => (
                    <div key={index} className={styles.story_item} onClick={handleModal}>
                        <div
                            className={`${styles.story_ring} ${story.seen ? styles['opacity-50'] : ''}`}
                        >
                            <div
                                className={styles.story_avatar}
                                style={{ backgroundImage: `url('${story.image}')` }}
                                title={story.alt}
                            />
                        </div>
                        <span
                            className={`${styles.story_label} ${story.seen ? styles.muted : ''}`}
                        >
                            {story.label}
                        </span>
                    </div>
                ))}
            </div>
            {modal && <Story handleModal={handleModal} />}
        </section>
    );
}