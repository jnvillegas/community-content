import styles from "./Header.module.css";
import banner from "../../assets/header-banner.JPG";
import video from "../../assets/header-video.mp4";
import { Link } from "@inertiajs/react"
import { PATHROUTES } from "../../helpers/PathRoutes";

const Header = () => {
    return (
        <header className={styles.main_content}>
            {/* <img src={banner} alt="" className={styles.video} /> */}
            <video className={styles.video} src={video} loop autoPlay muted ></video>
            <div className={styles.filter}></div>
            <div className={styles.text_content}>
                <h1 className={styles.title_first}>Viagens reais,</h1>
                <h1 className={styles.title_second}>Experiências vividas</h1>
                <p className={styles.subtitle}>Viagens autênticas, observação consciente e a arte de jornadas de longa duração. Não apenas visitamos lugares; deixamos que eles nos transformem.</p>
                <Link className={styles.link} href={PATHROUTES.COMMUNITY}>
                    Nossa comunidade
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        </header>
    )
}

export default Header;