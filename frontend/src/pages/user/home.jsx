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

const Home = () => {

  const {user} = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const items = [
    {
      name:"حقيبة جلدية كلاسيكية",
      image:bag1,
      description:"الحقيبة الكلاسيكية من نوع شانيل",
      categoryId:"",
      brandId:"",
      gender:"نسائي",
      color:"أحمر",
      size:"صغير",
      customerPrice:"129.99",
      wholesalerPrice:"105.99",
      salePrice:"",
      isSoldOut:false,
      isOnSale:false,
    },
    {
      name:"حقيبة جلدية كلاسيكية",
      image:bag2,
      description:"الحقيبة الكلاسيكية من نوع شانيل",
      categoryId:"",
      brandId:"",
      gender:"نسائي",
      color:"أحمر",
      size:"صغير",
      customerPrice:"129.99",
      wholesalerPrice:"105.99",
      salePrice:"",
      isSoldOut:true,
      isOnSale:false,
    },
    {
      name:"حقيبة جلدية كلاسيكية",
      image:bag1,
      description:"الحقيبة الكلاسيكية من نوع شانيل",
      categoryId:"",
      brandId:"",
      gender:"نسائي",
      color:"أحمر",
      size:"صغير",
      customerPrice:"129.99",
      wholesalerPrice:"105.99",
      salePrice:"",
      isSoldOut:false,
      isOnSale:true,
    },
    {
      name:"حقيبة جلدية كلاسيكية",
      image:bag2,
      description:"الحقيبة الكلاسيكية من نوع شانيل",
      categoryId:"",
      brandId:"",
      gender:"نسائي",
      color:"أحمر",
      size:"صغير",
      customerPrice:"129.99",
      wholesalerPrice:"105.99",
      salePrice:"",
      isSoldOut:false,
      isOnSale:false,
    },
    {
      name:"حقيبة جلدية كلاسيكية",
      image:'https://firebasestorage.googleapis.com/v0/b/fitrack-efd01.appspot.com/o/Screenshot%202024-12-21%20213256.png?alt=media&token=299e0af3-78e9-4de9-af85-c8e3bfddc1e9',
      description:"الحقيبة الكلاسيكية من نوع شانيل",
      categoryId:"",
      brandId:"",
      gender:"نسائي",
      color:"أحمر",
      size:"صغير",
      customerPrice:"129.99",
      wholesalerPrice:"105.99",
      salePrice:"",
      isSoldOut:false,
      isOnSale:false,
    },
    {
      name:"حقيبة جلدية كلاسيكية",
      image:bag1,
      description:"الحقيبة الكلاسيكية من نوع شانيل",
      categoryId:"",
      brandId:"",
      gender:"نسائي",
      color:"أحمر",
      size:"صغير",
      customerPrice:"129.99",
      wholesalerPrice:"105.99",
      salePrice:"",
      isSoldOut:false,
      isOnSale:false,
    },
    {
      name:"حقيبة جلدية كلاسيكية",
      image:bag2,
      description:"الحقيبة الكلاسيكية من نوع شانيل",
      categoryId:"",
      brandId:"",
      gender:"نسائي",
      color:"أحمر",
      size:"صغير",
      customerPrice:"129.99",
      wholesalerPrice:"105.99",
      salePrice:"",
      isSoldOut:true,
      isOnSale:false,
    },
    {
      name:"حقيبة جلدية كلاسيكية",
      image:bag1,
      description:"الحقيبة الكلاسيكية من نوع شانيل",
      categoryId:"",
      brandId:"",
      gender:"نسائي",
      color:"أحمر",
      size:"صغير",
      customerPrice:"129.99",
      wholesalerPrice:"105.99",
      salePrice:"",
      isSoldOut:false,
      isOnSale:true,
    },
    {
      name:"حقيبة جلدية كلاسيكية",
      image:bag2,
      description:"الحقيبة الكلاسيكية من نوع شانيل",
      categoryId:"",
      brandId:"",
      gender:"نسائي",
      color:"أحمر",
      size:"صغير",
      customerPrice:"129.99",
      wholesalerPrice:"105.99",
      salePrice:"",
      isSoldOut:false,
      isOnSale:false,
    },
    {
      name:"حقيبة جلدية كلاسيكية",
      image:'https://firebasestorage.googleapis.com/v0/b/fitrack-efd01.appspot.com/o/Screenshot%202024-12-21%20213256.png?alt=media&token=299e0af3-78e9-4de9-af85-c8e3bfddc1e9',
      description:"الحقيبة الكلاسيكية من نوع شانيل",
      categoryId:"",
      brandId:"",
      gender:"نسائي",
      color:"أحمر",
      size:"صغير",
      customerPrice:"129.99",
      wholesalerPrice:"105.99",
      salePrice:"",
      isSoldOut:false,
      isOnSale:false,
    },
  ]
  useEffect(() => {
    fetch("http://localhost:5001/user/features")
        .then(response => response.json())
        .then(data =>
        {
          console.log("data is : " , data);
          setProducts(data);
          console.log("Cat is : " , products);
        })
  },[])
  console.log("The user is : " , user)
  return(
      <Layout>
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
                    aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={promotionImg3} className={`d-block w-100 ${style.carouselImage}`} alt="..."/>
            </div>
            <div className="carousel-item">
              <img src={promotionImg2} className={`d-block w-100 ${style.carouselImage}`} alt="..."/>
            </div>
            <div className="carousel-item">
              <img id="carouselImage" src={promotionImg} className={`d-block w-100 ${style.carouselImage}`} alt="..."/>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>



        <div className={`mt-5 ${style.homePageCategoryDiv}`}>
          <Typography component={'h1'}>تسوق <span style={{color: 'var(--secondary)',fontSize:'1.8rem'}}>حسب</span> الفئة</Typography>
          <CategoryCards></CategoryCards>
        </div>

        <div className={`mt-5 ${style.homePageFeaturedProductDiv}`}>
          <Typography component={'h1'}>أخر ما وصلنا</Typography>
          <div className={`mt-5 ${style.featuredProduct}`}>
            {
              products.map(item => (
                  <CardItem item={item}></CardItem>
              ))
            }
          </div>
        </div>
        <br/>
      </Layout>
  )
}

export default Home;