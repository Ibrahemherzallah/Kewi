import style from './style/home.module.css';
import Typography from "../../components/typography/typography";
import {CategoryCards} from "../../containers/categoryCards.jsx";
import CardItem from "../../containers/card.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../context/userContext.jsx";
import Layout from "./layout.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useTranslation} from "react-i18next";


const Home = () => {

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
  const { t,i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
      <Layout isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab}>
        <section className={`${style.heroSection}`}>
          <div className={`${style.heroContainer}`}>
            <h1 className={'fw-semibold'}>{t("hero.title")}</h1>
            <p>{t("hero.subtitle")}</p>
            <div className={`${style.heroButtons}`}>
              <button onClick={scrollToFeatured} className={`${style.btnRed}`}>
                {t("hero.shopNow")}
              </button>
              <button onClick={scrollToCategories} className={`${style.btnWhite}`}>
                {t("hero.browseCats")}
              </button>
            </div>
          </div>
        </section>

        <div ref={categoriesRef} className={`${style.homePageCategoryDiv} ${isArabic ? style.ltr : ''}`} data-aos="fade-up">
          <div className="d-flex align-items-center my-3 gap-5" data-aos="fade-up">
            <hr style={{ flex: 1, borderTop: "2px solid #ccc" }} />
            <Typography component="h1" style={{ whiteSpace: "nowrap", color: "var(--hint-text)" }}>
              {t("home.shoppingByCat")}
            </Typography>
            <hr style={{ flex: 1, borderTop: "2px solid #ccc" }} />
          </div>
          <CategoryCards data-aos="fade-up"></CategoryCards>
        </div>

        <div ref={featuredRef} className={`${style.homePageFeaturedProductDiv}`} data-aos="fade-up">
          <div className="d-flex align-items-center my-3 gap-5" data-aos="fade-up">
            <hr style={{ flex: 1, borderTop: "2px solid #ccc" }} />
            <Typography component="h1" style={{ whiteSpace: "nowrap", color: "var(--hint-text)" }}>
              {t("home.lastProducts")}
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