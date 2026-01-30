import styles from './BlogDetail.module.css';
import WebLayout from '../../layout';
import { useParams } from 'react-router-dom';
import { usePage } from '@inertiajs/react';

const BlogDetail = () => {
    const { id } = useParams();
    const { article = [] } = usePage().props;

    console.log("article:", article);


    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div
                    className={styles.parallax_bg}
                    style={{
                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%), url('${article.featured_image && (article.featured_image.startsWith('http') || article.featured_image.startsWith('/storage')) ? article.featured_image : `/storage/${article.featured_image}`}')`,
                    }}
                />

                <div className={styles.hero_content}>
                    <h1 className={styles.hero_title}>{article.title}</h1>
                </div>

                <div className={styles.filter} />
            </section>

            <div className={styles.content}>
                <div className={styles.meta}>
                    <div className={styles.meta_content_author}>
                        <div className={styles.avatar}>
                            {article.author && article.author.name ? article.author.name.charAt(0) : 'A'}
                        </div>
                        <div className={styles.author_info}>
                            <p className={styles.author_name}>{article.author ? article.author.name : 'Anónimo'}</p>
                            <p className={styles.author_role}>Author</p>
                        </div>
                    </div>

                    <div className={styles.meta_info}>
                        <div className={styles.meta_content}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                            <p className={styles.meta_date}>{article.published_at}</p>
                        </div>

                        <div className={styles.meta_content}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <p className={styles.meta_date}>5 min.</p>
                        </div>
                    </div>
                </div>

                <div
                    className={styles.post_text}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
                {/* <p className={styles.post_text}>{article.content}</p> */}
            </div>
        </div>
    );
}

BlogDetail.layout = page => <WebLayout>{page}</WebLayout>

export default BlogDetail;