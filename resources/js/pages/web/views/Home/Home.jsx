import Header from "../../components/Main/Header";
import Youtube from "../../components/Main/Youtube";
import About from "../../components/Main/About";
import Phrase from "../../components/Main/Phrase";
import Blog from "../../components/Main/Blog";
import Wallpaper from "../../components/Main/Wallpaper";
import WebLayout from "../../layout";

const Home = () => {

    return (
        <>
            <Header />
            <About />
            <Youtube />
            <Phrase />
            <Blog />
            <Wallpaper />
        </>
    )
}

Home.layout = page => <WebLayout>{page}</WebLayout>


export default Home;
