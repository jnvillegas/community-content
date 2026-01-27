import styles from './BlogDetail.module.css';
import WebLayout from '../../layout';
import { useParams } from 'react-router-dom';
import { usePage } from '@inertiajs/react';

const BlogDetail = () => {
    const { id } = useParams();
    const { article = [] } = usePage().props;

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div
                    className={styles.parallax_bg}
                    style={{
                        backgroundImage: `url(${article.featured_image})`
                    }}
                />

                <div className={styles.hero_content}>
                    <h1 className={styles.hero_title}>{article.title}</h1>
                </div>

                <div className={styles.filter} />
            </section>

            <div className={styles.content}>
                <p className={styles.post_text}>{article.content}</p>
            </div>
        </div>
    );
}

BlogDetail.layout = page => <WebLayout>{page}</WebLayout>

export default BlogDetail;