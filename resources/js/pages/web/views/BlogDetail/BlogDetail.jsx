import styles from './BlogDetail.module.css';
import WebLayout from '../../layout';
import { useParams } from 'react-router-dom';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

const BlogDetail = () => {
    const { id } = useParams();
    const { article = [] } = usePage().props;

    const [copied, setCopied] = useState(false);

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title || 'Vivendo em Viagem',
                    text: 'Mira este contenido genial!',
                    url: currentUrl,
                });
            } catch (err) {
                console.log('Share cancelado o no soportado', err);
            }
        } else {
            handleCopyLink();
        }
    };


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
                    <h1 className={styles.hero_title}>BLOG</h1>
                </div>

                <div className={styles.filter} />
            </section>

            <div className={styles.content}>
                <h2 className={styles.article_title} >{article.title}</h2>
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

                <div className={styles.featured_image_container}>
                    <img
                        src={article.featured_image && (article.featured_image.startsWith('http') || article.featured_image.startsWith('/storage')) ? article.featured_image : `/storage/${article.featured_image}`}
                        alt={article.title}
                        className={styles.featured_image}
                    />
                </div>

                <div
                    className={styles.post_text}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <div className={styles.share_container}>
                    <div className={styles.share_text_content}>
                        <p className={styles.share_title}>Gostou deste artigo?</p>
                        <p className={styles.shre_subtitle}>Compartilhe com sua comunidade.</p>
                    </div>
                    <div className={styles.share_links_container}>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Compartir en Facebook"
                            className={styles.social}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </a>

                        <a
                            href="https://www.instagram.com/vivendoemviagem/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className={styles.social}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.2625 1.66651C12.2875 1.66651 12.5825 1.67734 13.4358 1.71651C14.3225 1.75734 14.9283 1.89818 15.4583 2.10401C16.0146 2.31307 16.5185 2.64097 16.935 3.06484C17.3589 3.48132 17.6868 3.98526 17.8958 4.54151C18.1017 5.07151 18.2425 5.67734 18.2833 6.56401C18.3233 7.45318 18.3333 7.73651 18.3333 9.99984V10.0665C18.3333 12.269 18.3233 12.5557 18.2833 13.4357C18.2425 14.3223 18.1017 14.9282 17.8958 15.4582C17.6868 16.0144 17.3589 16.5184 16.935 16.9348C16.5185 17.3587 16.0146 17.6866 15.4583 17.8957C14.9283 18.1015 14.3225 18.2423 13.4358 18.2832C12.5467 18.3232 12.2633 18.3332 9.99999 18.3332H9.93332C7.73082 18.3332 7.44416 18.3232 6.56416 18.2832C5.67749 18.2423 5.07166 18.1015 4.54166 17.8957C3.98541 17.6866 3.48147 17.3587 3.06499 16.9348C2.64112 16.5184 2.31322 16.0144 2.10416 15.4582C1.89832 14.9282 1.75749 14.3223 1.71666 13.4357C1.67749 12.5823 1.66666 12.2865 1.66666 10.2623V9.73734C1.66666 7.71234 1.67749 7.41734 1.71666 6.56401C1.75749 5.67734 1.89832 5.07151 2.10416 4.54151C2.31322 3.98526 2.64112 3.48132 3.06499 3.06484C3.47272 2.59327 3.98297 2.22128 4.55666 1.97734C5.08666 1.77151 5.69249 1.63068 6.57916 1.58984C7.41749 1.67734 7.71332 1.66651 9.73749 1.66651H10.2625ZM10.195 3.16818H9.80499C7.75832 3.16818 7.48499 3.17734 6.63249 3.21651C5.81999 3.25401 5.37916 3.38901 5.08499 3.50318C4.69582 3.65484 4.41832 3.83484 4.12666 4.12651C3.83499 4.41818 3.65499 4.69568 3.50332 5.08484C3.38916 5.37901 3.25332 5.81984 3.21666 6.63234C3.17749 7.48484 3.16832 7.75818 3.16832 9.80484V10.1948C3.16832 12.2415 3.17749 12.5148 3.21666 13.3673C3.25416 14.1798 3.38916 14.6207 3.50332 14.9148C3.65499 15.3032 3.83582 15.5815 4.12666 15.8732C4.41832 16.1648 4.69582 16.3448 5.08499 16.4965C5.37916 16.6107 5.81999 16.7465 6.63249 16.7832C7.51082 16.8232 7.77416 16.8315 9.99999 16.8315H10.0667C12.2308 16.8315 12.4975 16.8232 13.3667 16.7832C14.18 16.7457 14.6208 16.6107 14.915 16.4965C15.3033 16.3448 15.5817 16.1648 15.8733 15.8732C16.165 15.5815 16.345 15.304 16.4967 14.9148C16.6108 14.6207 16.7467 14.1798 16.7833 13.3673C16.8233 12.4882 16.8317 12.2257 16.8317 9.99984V9.93318C16.8317 7.76901 16.8233 7.50234 16.7833 6.63318C16.7458 5.81984 16.6108 5.37901 16.4967 5.08484C16.3631 4.72282 16.1501 4.39534 15.8733 4.12651C15.6045 3.84973 15.277 3.63673 14.915 3.50318C14.6208 3.38901 14.18 3.25318 13.3675 3.21651C12.515 3.17734 12.2417 3.16818 10.195 3.16818ZM9.99999 5.72068C10.5619 5.72068 11.1184 5.83136 11.6376 6.04641C12.1567 6.26146 12.6285 6.57666 13.0258 6.97402C13.4232 7.37137 13.7384 7.84311 13.9534 8.36228C14.1685 8.88145 14.2792 9.4379 14.2792 9.99984C14.2792 10.5618 14.1685 11.1182 13.9534 11.6374C13.7384 12.1566 13.4232 12.6283 13.0258 13.0257C12.6285 13.423 12.1567 13.7382 11.6376 13.9533C11.1184 14.1683 10.5619 14.279 9.99999 14.279C8.86508 14.279 7.77666 13.8282 6.97416 13.0257C6.17166 12.2232 5.72082 11.1347 5.72082 9.99984C5.72082 8.86494 6.17166 7.77652 6.97416 6.97402C7.77666 6.17152 8.86508 5.72068 9.99999 5.72068ZM9.99999 7.22234C9.26335 7.22234 8.55688 7.51497 8.036 8.03585C7.51512 8.55674 7.22249 9.2632 7.22249 9.99984C7.22249 10.7365 7.51512 11.443 8.036 11.9638C8.55688 12.4847 9.26335 12.7773 9.99999 12.7773C10.7366 12.7773 11.4431 12.4847 11.964 11.9638C12.4849 11.443 12.7775 10.7365 12.7775 9.99984C12.7775 9.2632 12.4849 8.55674 11.964 8.03585C11.4431 7.51497 10.7366 7.22234 9.99999 7.22234ZM14.4483 4.55151C14.7135 4.55151 14.9679 4.65687 15.1554 4.8444C15.343 5.03194 15.4483 5.28629 15.4483 5.55151C15.4483 5.81673 15.343 6.07108 15.1554 6.25862C14.9679 6.44615 14.7135 6.55151 14.4483 6.55151C14.1831 6.55151 13.9288 6.44615 13.7412 6.25862C13.5537 6.07108 13.4483 5.81673 13.4483 5.55151C13.4483 5.28629 13.5537 5.03194 13.7412 4.8444C13.9288 4.65687 14.1831 4.55151 14.4483 4.55151Z" fill="currentColor" />
                            </svg>
                        </a>

                        <button
                            onClick={navigator.share ? handleNativeShare : handleCopyLink}
                            className={styles.social}
                            aria-label={copied ? '¡Link copiado!' : 'Copiar link'}
                            title={copied ? '¡Link copiado!' : 'Copiar link al portapapeles'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link h-5 w-5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

BlogDetail.layout = page => <WebLayout>{page}</WebLayout>

export default BlogDetail;