import styles from './BlogDetail.module.css';
import { useParams } from 'react-router-dom';
import { usePage } from '@inertiajs/react';

const BlogDetail = () => {
    const { id } = useParams();
    const { article = [] } = usePage().props;

    console.log("articles desde backend:", article);

    const post = {
        id: 1,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjDVkKflTgrZ_1rZhK8XUsFSkzFscq-8kU3zhsKLKLtqfy26e-kxMpLrRGuuZDM1GidGhAcdhAPE0_cAlbpRO_rswzb2fraB5Z9cIzwJaG8osoylSQgG7fUNYFqzWwUMfslFIHWRh85WW2DThxQ6nbYvhGf8molibdRLGLefzwieOLYm7CeEuuHQXAM_4nlJpEVL66yIaxk5KVZuKoivO_LkUosg6y8t2qqsEVtdlpMBqzPns7PBkJgNfNuiyIrhXlkHan4n_L_o8",
        category: "Natureza",
        title: "Flavor of the Wild",
        text: "Explorar o mundo ao ar livre é uma experiência que alimenta a alma. Desde as majestosas montanhas até as serenas praias, cada cenário oferece uma oportunidade única de conexão com a natureza. Neste post, vamos mergulhar nas maravilhas do ar livre e descobrir como aproveitar ao máximo essas aventuras. Explorar o mundo ao ar livre é uma experiência que alimenta a alma. Desde as majestosas montanhas até as serenas praias, cada cenário oferece uma oportunidade única de conexão com a natureza. Neste post, vamos mergulhar nas maravilhas do ar livre e descobrir como aproveitar ao máximo essas aventuras."
    };

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

export default BlogDetail;