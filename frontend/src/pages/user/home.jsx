import NavBar from "../../containers/userNavBar.jsx";
import saleImg from "../../assets/sale.jpg";
import style from './style/home.module.css';
import { IconBtn } from "../../components/icons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import img from "../../assets/img.jpg"
// import { CardNormal, CardSoldOut, CardSale } from "../../containers/card";
import Typography from "../../components/typography/typography";
import {CategoryCards} from "../../containers/categoryCards.jsx";
import promotionImg from "../../assets/promotion.jpg";
import promotionImg2 from "../../assets/promotionImg.webp";
import promotionImg3 from "../../assets/promotionImage.webp";
import bag1 from "../../assets/bag1.jpg";
import bag2 from "../../assets/bag2.jpg";
import CardItem from "../../containers/card.jsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/userContext.jsx";
import Layout from "./layout.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Home = () => {

  const {user} = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // only animate once when scrolling down
    });
    fetch("http://localhost:5001/user/features")
        .then(response => response.json())
        .then(data =>
        {
          setProducts(data);
        })
  },[])
  return(
      <Layout isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen}>
        <div
            id="carouselExampleIndicators"
            className="carousel slide mt-5"
            data-bs-ride="carousel"
            data-bs-interval="2000"
            data-aos="fade-up"
        >
          <div className="carousel-indicators">
            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
            ></button>
            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
            ></button>
            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                  src={promotionImg3}
                  className={`d-block w-100 ${style.carouselImage}`}
                  alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                  src={promotionImg2}
                  className={`d-block w-100 ${style.carouselImage}`}
                  alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                  id="carouselImage"
                  src={promotionImg}
                  className={`d-block w-100 ${style.carouselImage}`}
                  alt="..."
              />
            </div>
          </div>

          <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className={`d-flex flex-column justify-content-center align-items-center ${style.whoWeDiv}`} data-aos="fade-up">
          <h1 className={`fw-bold`}>من نحن ؟</h1><br />
          <p className={`text-center ${style.whoWe}`} >متجر متخصص في بيع المنتجات الكورية و اليابانية في فلسطين تأسس في 2022 يعمل على توفير اكبر تشكيلة من المنتجات الكورية و اليابانية المتخصصة في العناية بالبشرة و الجسم و بأفضل الاسعار . هدفنا ان نكون بوابتك الى الكنوز الكورية و اليابانية و ان نعمل على تبسيط الطريق الى الجمال و العناية بالبشرة و نشر مفهوم</p>
        </div>
        <div className={`${style.homePageCategoryDiv}`} data-aos="fade-up">
          <div className="d-flex align-items-center my-3 gap-5" data-aos="fade-up">
            <hr style={{ flex: 1, borderTop: '2px solid #ccc' }} />
            <Typography component="h1" style={{ whiteSpace: 'nowrap',color:'gray' }}>
              تسوق <span style={{  fontSize: '1.8rem' }}>حسب</span> الفئة
            </Typography>
            <hr style={{ flex: 1, borderTop: '2px solid #ccc' }} />
          </div>
          <CategoryCards data-aos="fade-up"></CategoryCards>
        </div>
        <div className={`${style.homePageFeaturedProductDiv}`} data-aos="fade-up">
          <div className="d-flex align-items-center my-3 gap-5" data-aos="fade-up">
            <hr style={{ flex: 1, borderTop: '2px solid #ccc' }} />
            <Typography component="h1" style={{ whiteSpace: 'nowrap', color: 'gray' }}>
              أخر ما وصلنا
            </Typography>
            <hr style={{ flex: 1, borderTop: '2px solid #ccc' }} />
          </div>
          <div className={`${style.featuredProduct}`} data-aos="fade-up">
            {
              products.map(item => (
                  <CardItem isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} item={item}></CardItem>
              ))
            }
          </div>
        </div>
        <br/>
      </Layout>
  )
}

export default Home;