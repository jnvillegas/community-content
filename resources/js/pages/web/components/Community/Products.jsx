import React from 'react';
import styles from './Products.module.css';

const mockProducts = [
    {
        id: 1,
        name: "Remera 'Horizonte Infinito'",
        description: "100% Algodão Premium - Edição Limitada",
        price: "R$ 129,90",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBxWW2DcMXYnUZGJlVBDOSyvG5-CCHQGgu4Rtguznw8xbJmB0SqRtdYLcZgWvhE_9U8hLcCheILt4mj8ZxdbjSharI1pbegnLpXH45EgST19fK5fItZ-v00tGHwTedkjz4RGNFe00LZ4PWwzfq_NGutBvVXXbn_j71dSXo0bmEy1wE8uhqXNMaiocgr3QtINt-fNFIiZhnzMjnGbI1qB-LDAgKg444Ir_yNG7CNp3XO9gJItgIJyCiXgd3t2CDOWwFDkg2rBJEKQ3k",
        isNew: true,
    },
    {
        id: 2,
        name: "Remera 'Life on Wheels'",
        description: "Oversized Fit - Estampa Silk-Screen",
        price: "R$ 134,90",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAdyF7IdKBoV7G5URhbyJeQtHQ9-58o2fzJghUqKcQtQoFoMleI2vEhMo3MGGrc6PQHnHYmnPekKOCrJ1_RJfqCj2dsmm0zHq53cas4qLWL68I_Ye0o43MoAdZXvcBCgX407FLfWrf3TbQvwPDXEfvmUpRN8c91qlGL3ruBNx9m8kzyZbKMJSORVfIYYf-gWx36CqwodYAnMudFAqRx_NFzDxk2ZAtTJ9LF1aBB4vJzcTpVgqMZcZN5kiI34uTPaW_arBL0zu9TfRg",
        isNew: false,
    },
    {
        id: 3,
        name: "Pack Calcomanias (12un)",
        description: "Vinil ultra-resistente à prova d'água",
        price: "R$ 45,00",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAHPkelI_1BCLEhU5QQtj4jRzwINyz1wjnBIgO035P5Ld7wqe2OGXaNjSjO6I4iknN3W2lD9uhKj_7qf_4Gjs3wcMMmOzNIxFYoHAD5gYeGV9BErvh4h9kenL1Sea5zCu117Rb6VHHzowB4m-kQ7BjaS7XkBbJdo4XwD1YKce8EmtQ5mZngQaU1N7i1Rgnhfs9cpHO2L8TDQPgi1r2-1rKJEdGT_1OBtemj7OKQ7oeoR1atuhJ9FjRreC9QoZvWnwLLoqpXhtvsOco",
        isNew: false,
    },
];

const Products = ({ products = mockProducts }) => {
    return (
        <section className={styles.shop_section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Loja Oficial</h2>
                <p className={styles.description}>
                    Equipamentos e vestuário com a essência do viajante profissional.
                </p>
            </div>

            <div className={styles.products_grid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.product_card}>
                        <div className={styles.product_image_container}>
                            <div
                                className={styles.product_image}
                                style={{ backgroundImage: `url('${product.image}')` }}
                            />
                            {product.isNew && (
                                <div className={styles.badge}>Novo</div>
                            )}
                        </div>

                        <div className={styles.product_info}>
                            <h3 className={styles.product_name}>{product.name}</h3>
                            <p className={styles.product_desc}>{product.description}</p>

                            <div className={styles.price_row}>
                                <span className={styles.price}>{product.price}</span>
                                <button className={styles.add_button}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.04047 2.29242C2.6497 2.15503 2.22155 2.36044 2.08416 2.7512C1.94678 3.14197 2.15218 3.57012 2.54295 3.7075L2.80416 3.79934C3.47177 4.03406 3.91052 4.18961 4.23336 4.34802C4.53659 4.4968 4.67026 4.61723 4.75832 4.74609C4.84858 4.87818 4.91828 5.0596 4.95761 5.42295C4.99877 5.80316 4.99979 6.29837 4.99979 7.03832L4.99979 9.64C4.99979 12.5816 5.06302 13.5523 5.92943 14.4662C6.79583 15.38 8.19028 15.38 10.9792 15.38H16.2821C17.8431 15.38 18.6236 15.38 19.1753 14.9304C19.727 14.4808 19.8846 13.7164 20.1997 12.1875L20.6995 9.76275C21.0466 8.02369 21.2202 7.15417 20.7762 6.57708C20.3323 6 18.8155 6 17.1305 6H6.49233C6.48564 5.72967 6.47295 5.48373 6.4489 5.26153C6.39517 4.76515 6.27875 4.31243 5.99677 3.89979C5.71259 3.48393 5.33474 3.21759 4.89411 3.00139C4.48203 2.79919 3.95839 2.61511 3.34187 2.39838L3.04047 2.29242ZM13 8.25C13.4142 8.25 13.75 8.58579 13.75 9V10.25H15C15.4142 10.25 15.75 10.5858 15.75 11C15.75 11.4142 15.4142 11.75 15 11.75H13.75V13C13.75 13.4142 13.4142 13.75 13 13.75C12.5858 13.75 12.25 13.4142 12.25 13V11.75H11C10.5858 11.75 10.25 11.4142 10.25 11C10.25 10.5858 10.5858 10.25 11 10.25H12.25V9C12.25 8.58579 12.5858 8.25 13 8.25Z" fill="currentColor" />
                                        <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" fill="currentColor" />
                                        <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.catalog_button_container}>
                <button className={styles.catalog_button}>
                    Ver Catálogo Completo
                </button>
            </div>
        </section>
    );
}

export default Products;