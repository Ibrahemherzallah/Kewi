import UserNavBar from "../../containers/userNavBar.jsx";
import style from "./style/home.module.css";
import CardItem from "../../containers/card.jsx";
import Typography from "../../components/typography/typography.jsx";
import Layout from "./layout.jsx";
import {useParams} from "react-router";

const Product = () => {
    return (
            <Layout>
                <div className={` ${style.product}`}>
                    <img src={''} />
                </div>
            </Layout>
    )
}
export default Product;