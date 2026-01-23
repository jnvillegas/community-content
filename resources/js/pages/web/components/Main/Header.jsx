import styles from "./Header.module.css";
import banner from "../../assets/header-banner.JPG";

const Header = () => {
    return (
        <header className={styles.main_content}>
            <img src={banner} alt="" className={styles.video} />
            {/* <video className={styles.video} src={video} loop autoPlay muted ></video> */}
            <div className={styles.filter}></div>
            <div className={styles.text_content}>
                <h1 className={styles.title_first}>Viagens reais,</h1>
                <h1 className={styles.title_second}>Experiências vividas</h1>
                <p className={styles.subtitle}>Viagens autênticas, observação consciente e a arte de jornadas de longa duração. <br />Não apenas visitamos lugares; deixamos que eles nos transformem.</p>
                <a className={styles.link} href="https://www.youtube.com/@vivendoemviagem" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14 12C14 14.7614 11.7614 17 9 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H7.5M10 12C10 9.23858 12.2386 7 15 7H17C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17H16.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Nossa comunidade
                </a>
            </div>
        </header>
    )
}

export default Header;