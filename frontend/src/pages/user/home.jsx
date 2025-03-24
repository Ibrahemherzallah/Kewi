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
// import test from 'https://firebasestorage.googleapis.com/v0/b/fitrack-efd01.appspot.com/o/Screenshot%202024-12-21%20213256.png?alt=media&token=299e0af3-78e9-4de9-af85-c8e3bfddc1e9'
import CardItem from "../../containers/card.jsx";

const Home = () => {

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
  ]


  return(
    <>
      <NavBar></NavBar>
      <div className={style.homePageMainContentDiv}>


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
              <img id="carouselImage" src={promotionImg} className={`d-block w-100 ${style.carouselImage}`} alt="..."/>
            </div>
            <div className="carousel-item">
              <img src={promotionImg2} className={`d-block w-100 ${style.carouselImage}`} alt="..."/>
            </div>
            <div className="carousel-item">
              <img src={promotionImg3} className={`d-block w-100 ${style.carouselImage}`} alt="..."/>
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
          <Typography component={'h1'}>تسوق <span style={{color: 'var(--secondary)'}}>حسب</span> الفئة</Typography>
          <CategoryCards></CategoryCards>
        </div>

        <div className={`mt-5 ${style.homePageFeaturedProductDiv}`}>
          <Typography component={'h1'}>أحدث المنتجات</Typography>
          <div className={`mt-5 ${style.featuredProduct}`}>

            <CardItem item={items[0]}></CardItem>
            <CardItem item={items[1]}></CardItem>
            <CardItem item={items[2]}></CardItem>
            <CardItem item={items[3]}></CardItem>
            <CardItem item={items[2]}></CardItem>
            <CardItem item={items[3]}></CardItem>
            <CardItem item={items[1]}></CardItem>
            <CardItem item={items[0]}></CardItem>
            <CardItem item={items[2]}></CardItem>
            <CardItem item={items[3]}></CardItem>
            <CardItem item={items[2]}></CardItem>
            <CardItem item={items[3]}></CardItem>
            <CardItem item={items[4]}></CardItem>

          </div>
        </div>
        <br/>
      </div>

      <div className={`d-flex justify-content-between ${style.footer}`}>

        <div className={`d-flex w-50 justify-content-around`}>

          <div>
            <Typography component={'h1'} size={'xl'}>من نحن</Typography>
            <br/>
            <Typography component={'p'} size={'sm'}>اكتشف أحدث إكسسوارات الموضة النسائية في كيوي.<br/> منتجات عالية
              الجودة للمرأة العصرية.</Typography>
          </div>
          <div>
            <Typography component={'h1'} size={'xl'}>روابط سريعة</Typography>
            <br />
              <a>حقائب يد</a>
              <br/>
              <a>اكسسوارات</a>
          </div>

        </div>


        <div className={`d-flex w-50 justify-content-around`}>
          <div>
            <Typography component={'h1'}>خدمة العملاء</Typography>
            <br/>
            <Typography component={'p'}>تواصل معنا</Typography>
            <br/>
            <Typography component={'p'}>أو من خلال الرقم :<br/> 9703948571655 + <br/> 9723849692284 +</Typography>
          </div>
          <div>
            <Typography component={'h1'}>معلومات التواصل</Typography>
            <br/>
            <Typography component={'p'}>اشترك للحصول على عروض خاصة وتحديثات</Typography>
          </div>
        </div>


      </div>
    </>

  )
}

export default Home;