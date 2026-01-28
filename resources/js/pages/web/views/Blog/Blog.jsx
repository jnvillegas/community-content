import React from 'react';
import styles from './Blog.module.css';
import WebLayout from '../../layout';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import Newsletters from '../../components/Newsletter/Newsletter';

const scrollToTop = () => {
    window.scrollTo(0, 0);
}

const Blog = () => {
    const { articles = [] } = usePage().props;

    const items = articles.data.length > 0 ? articles.data : [];

    return (
        <div>
            <section className={styles.hero}>
                <div className={styles.parallax_bg}></div>
                <div className={styles.hero_content}>
                    <h1 className={styles.hero_title}>Blog</h1>
                </div>
                <div className={styles.filter}></div>
            </section>

            <Newsletters />

            <section className={styles.stories_section}>
                <div className={styles.stories_header}>
                    <h2 className={styles.stories_title}>Nossas Histórias</h2>
                </div>

                <div className={styles.stories_grid}>
                    {items.map((item, index) => (
                        <Link href={`/blog/${item.id}`} onClick={scrollToTop} key={index} className={styles.story_card}>
                            <div className={styles.story_image_wrapper}>
                                <div
                                    className={styles.story_background}
                                    style={{
                                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%), url('${item.featured_image && (item.featured_image.startsWith('http') || item.featured_image.startsWith('/storage')) ? item.featured_image : `/storage/${item.featured_image}`}')`,
                                    }}
                                />
                                <div className={styles.story_overlay}>
                                    <span className={styles.category_badge}>{item.location}</span>
                                    <h3 className={styles.story_title}>{item.title}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

Blog.layout = page => <WebLayout>{page}</WebLayout>

export default Blog;