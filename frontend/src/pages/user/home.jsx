import NavBar from "../../containers/userNavBar.jsx";
import saleImg from "../../assets/sale.jpg";
import style from './style/home.module.css';
import { IconBtn } from "../../components/icons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Typography from "../../components/typography/typography";
import {CategoryCards} from "../../containers/categoryCards.jsx";
import promotionImg from "../../assets/img1.jpg";
import promotionImg2 from "../../assets/img2.jpg";
import promotionImg3 from "../../assets/img3.jpg";
import promotionImg4 from "../../assets/img4.jpg";

import CardItem from "../../containers/card.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../context/userContext.jsx";
import Layout from "./layout.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from "react-router";


const Home = () => {

  const {user} = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cart"); // cart | reserved

  // ⬅ Refs for the sections
  const featuredRef = useRef(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    fetch("https://kewi.ps/user/features")
        .then(response => response.json())
        .then(data =>
        {
          setProducts(data);
        })
  },[])



  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
      <Layout isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab}>
        <section className={`${style.heroSection}`}>
          <div className={`${style.heroContainer}`}>
            <h1 className={'fw-semibold'}>مرحباً بك في كيوي</h1>
            <p>اكتشفي أحدث الحقائب والإكسسوارات بتصاميم عصرية وأسعار مميزة</p>
            <div className={`${style.heroButtons}`}>
              <button onClick={scrollToFeatured} className={`${style.btnRed}`}>
                تسوق الآن
              </button>
              <button onClick={scrollToCategories} className={`${style.btnWhite}`}>
                استعرض الفئات
              </button>
            </div>
          </div>
        </section>

        <div ref={categoriesRef} className={`${style.homePageCategoryDiv}`} data-aos="fade-up">
          <div className="d-flex align-items-center my-3 gap-5" data-aos="fade-up">
            <hr style={{ flex: 1, borderTop: "2px solid #ccc" }} />
            <Typography component="h1" style={{ whiteSpace: "nowrap", color: "var(--hint-text)" }}>
              تسوق  حسب  الفئة
            </Typography>
            <hr style={{ flex: 1, borderTop: "2px solid #ccc" }} />
          </div>
          <CategoryCards data-aos="fade-up"></CategoryCards>
        </div>

        <div ref={featuredRef} className={`${style.homePageFeaturedProductDiv}`} data-aos="fade-up">
          <div className="d-flex align-items-center my-3 gap-5" data-aos="fade-up">
            <hr style={{ flex: 1, borderTop: "2px solid #ccc" }} />
            <Typography component="h1" style={{ whiteSpace: "nowrap", color: "var(--hint-text)" }}>
              أخر ما وصلنا
            </Typography>
            <hr style={{ flex: 1, borderTop: "2px solid #ccc" }} />
          </div>
          <div className={`${style.featuredProduct}`} data-aos="fade-up">
            {products.map((item, index) => (
                <CardItem key={index} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} item={item}></CardItem>
            ))}
          </div>
        </div>

        <br />
      </Layout>
  );
}

export default Home;