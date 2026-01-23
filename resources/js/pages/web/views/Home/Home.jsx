import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Main/Header";
import Youtube from "../../components/Main/Youtube";
import About from "../../components/Main/About";
import Phrase from "../../components/Main/Phrase";
import Blog from "../../components/Main/Blog";
import Wallpaper from "../../components/Main/Wallpaper";
import Footer from "../../components/Footer/Footer";
import { useAppearance } from "@/hooks/use-appearance";

const Home = () => {
    const { appearance, updateAppearance } = useAppearance();
    const darkMode = appearance === 'dark';

    const toggleTheme = () => {
        updateAppearance(darkMode ? 'light' : 'dark');
    };

    return (
        <div className="web-layout">
            <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
            <Header />
            <About />
            <Youtube />
            <Phrase />
            <Blog />
            <Wallpaper />
            <Footer />
        </div>
    )
}

export default Home;