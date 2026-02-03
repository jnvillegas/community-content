import styles from "./Community.module.css";
import Stories from "../../components/Community/Stories";
import WebLayout from "../../layout";
import Banner from "../../components/Banner/Banner";
import Events from "../../components/Community/Events";
import Products from "../../components/Community/Products";

const Community = () => {
    return (
        <div>
            <Banner title={"Bienvenidos!"} />
            <div className={styles.main}>
                <Stories />
                <Events />
                <Products />
            </div>
        </div>
    )
}

Community.layout = page => <WebLayout>{page}</WebLayout>

export default Community;