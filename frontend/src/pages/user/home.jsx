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
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/userContext.jsx";
import Layout from "./layout.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from "react-router";


const Home = () => {

  const {user} = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
  return(
      <Layout isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen}>
        <div id="carouselExampleIndicators" className={`carousel slide ${style.carouselSlide}`} data-bs-ride="carousel" data-bs-interval="2000" data-aos="fade-up">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <Link to={'/category/6803fb1535efe305218f9a10'} state= {{catName: 'العروض'}}>
                <img src={promotionImg3} className={`d-block w-100 ${style.carouselImage}`} alt="..."/>
              </Link>
            </div>
            <div className="carousel-item">
              <Link to={'/category/6803fb1535efe305218f9a10'} state= {{catName: 'العروض'}}>
                <img src={promotionImg2} className={`d-block w-100 ${style.carouselImage}`} alt="..."/>
              </Link>
            </div>
            <div className="carousel-item">
              <Link to={'/category/6803fb1535efe305218f9a10'} state= {{catName: 'العروض'}}>
                <img id="carouselImage" src={promotionImg} className={`d-block w-100 ${style.carouselImage}`} alt="..."/>
              </Link>
            </div>
            <div className="carousel-item">
              <Link to={'/category/6803fb1535efe305218f9a10'} state= {{catName: 'العروض'}}>
                <img src={promotionImg4} className={`d-block w-100 ${style.carouselImage}`} alt="..."/>
              </Link>
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
          <p className={`text-center ${style.whoWe}`} >
            “في كل شنطة بنقدمها، وراها سعي وتعب وحُب… إحنا ما بنبيع بس منتج، إحنا بنوصلكم شغفنا وطموحنا خطوة بخطوة.”<br/>
            “مش بس شنط، هذا تعب وسعي وحلم تحقق عشان يوصل لإيدك.”
          </p>
        </div>
        <div className={`${style.homePageCategoryDiv}`} data-aos="fade-up">
          <div className="d-flex align-items-center my-3 gap-5" data-aos="fade-up">
            <hr style={{ flex: 1, borderTop: '2px solid #ccc' }} />
            <Typography component="h1" style={{ whiteSpace: 'nowrap',color:'var(--hint-text)' }}>
              تسوق  حسب  الفئة
            </Typography>
            <hr style={{ flex: 1, borderTop: '2px solid #ccc' }} />
          </div>
          <CategoryCards data-aos="fade-up"></CategoryCards>
        </div>
        <div className={`${style.homePageFeaturedProductDiv}`} data-aos="fade-up">
          <div className="d-flex align-items-center my-3 gap-5" data-aos="fade-up">
            <hr style={{ flex: 1, borderTop: '2px solid #ccc' }} />
            <Typography component="h1" style={{ whiteSpace: 'nowrap', color: 'var(--hint-text)' }}>
              أخر ما وصلنا
            </Typography>
            <hr style={{ flex: 1, borderTop: '2px solid #ccc' }} />
          </div>
          <div className={`${style.featuredProduct}`} data-aos="fade-up">
            {
              products.map((item,index) => (
                  <CardItem key={index} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} item={item}></CardItem>
              ))
            }
          </div>
        </div>
        <br/>
      </Layout>
  )
}

export default Home;