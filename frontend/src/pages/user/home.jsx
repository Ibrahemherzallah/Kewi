import NavBar from "../../containers/navbar";
import saleImg from "../../assets/sale.jpg";
import style from './style/home.module.css';
import { IconBtn } from "../../components/icons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import bagImg from '../../assets/handbag.jpg';
import img from "../../assets/img.jpg"
import { CardNormal, CardSoldOut, CardSale,ImageCard } from "../../containers/card";
import Typography from "../../components/typography/typography";

const Home = () => {

  const categories = {

  }

  return(
    <>
        <NavBar></NavBar>
        <div className={style.homePageMainContentDiv}>

          <div className="position-relative">
            <IconBtn style={{position:'absolute',right:'20px',top:'200px'}} variant={'circle'} size={'lg'}><FontAwesomeIcon style={{fontSize:'2rem'}} icon={faChevronRight} /></IconBtn>
            <img className={style.homePageMainPic} src={saleImg} />
            <IconBtn style={{position:'absolute',left:'20px',top:'200px'}} variant={'circle'} size={'lg'}><FontAwesomeIcon style={{fontSize:'2rem'}} icon={faChevronLeft} /></IconBtn>
          </div>
          


          <div className={`mt-5 ${style.homePageCategoryDiv}`}>
            <Typography component={'h1'}>تسوق <span style={{color:'var(--secondary)'}}>حسب</span> الفئة</Typography>
            <div className={`d-flex gap-4 mt-5 ${style.categories}`}>  
              <IconBtn style={{position:'absolute',right:'-10px',top:'50px'}} variant={'circle'} size={'lg'}><FontAwesomeIcon style={{fontSize:'2rem'}} icon={faChevronRight} /></IconBtn>
              <ImageCard src={bagImg} text={"handbag"}></ImageCard>
              <ImageCard src={img} text={"handbag"}></ImageCard>
              <ImageCard src={bagImg} text={"handbag"}></ImageCard>
              <ImageCard src={img} text={"handbag"}></ImageCard>
              <IconBtn style={{position:'absolute',left:'-10px',top:'50px'}} variant={'circle'} size={'lg'}><FontAwesomeIcon style={{fontSize:'2rem'}} icon={faChevronLeft} /></IconBtn>
            </div>
          </div>

          <div className={`mt-5 ${style.homePageFeaturedProductDiv}`}>
          <Typography component={'h1'}>أحدث المنتجات</Typography>
            <div className={`d-flex gap-5 mt-5 ${style.categories}`}>  
              <CardNormal src={img}></CardNormal>
              <CardSoldOut src={img}></CardSoldOut>
              <CardSale src={img}></CardSale>
              <CardNormal src={img}></CardNormal>
            </div>
            <div className={`d-flex gap-5 mt-5 ${style.categories}`}>  
              <CardNormal src={img}></CardNormal>
              <CardSoldOut src={img}></CardSoldOut>
              <CardSale src={img}></CardSale>
              <CardNormal src={img}></CardNormal>
            </div>
          </div>

        </div>
    </>

  )
}

export default Home;