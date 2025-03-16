import { Card, CardDescription, CardBody, CardImg, CardTitle, CardButton } from "../components/card/card";
// import { CardNormal, }
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import style from '../components/card/card.module.css';
import Typography from "../components/typography/typography";
import soldout from "../assets/soldout.png";
import sale from "../assets/sale1.png";

export function CardNormal  ({src,alt})  {
  return(
    <Card>
      <CardImg src={src} alt={alt}/>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <Typography component={'h6'} variant={'tertiary'}>صغير</Typography>
          <CardTitle>العنوان الرئيسي</CardTitle>
        </div>
        <Typography component={'h6'} variant={'tertiary'}>بنفسجي</Typography>
        <CardDescription>الشنتة الكلاسيكية من نوع شانيل الجميلة المتعة</CardDescription>
        <div className="mt-3 d-flex justify-content-between">
          <CardButton variant={'secondary'}>   
              <FontAwesomeIcon icon={faCartPlus}  />
          </CardButton>
          <Typography variant={'h5'}>₪129.99</Typography>
        </div>
      </CardBody>
    </Card>
  )
}

export function CardSoldOut ({src,alt}) {
  return(
    <Card>
      <div className="position-relative">
        <img className={style.soldOutImg} src={soldout} alt="" />
        <CardImg src={src} alt={alt}/>
      </div>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <Typography component={'h6'} variant={'tertiary'}>صغير</Typography>
          <CardTitle>العنوان الرئيسي</CardTitle>
        </div>
        <Typography component={'h6'} variant={'tertiary'}>بنفسجي</Typography>
        <CardDescription>الشنتة الكلاسيكية من نوع شانيل الجميلة المتعة</CardDescription>
        <div className="mt-3 d-flex justify-content-between">
          <CardButton variant={'tertiary'}>   
              <FontAwesomeIcon icon={faCartPlus}  />
          </CardButton>
          <Typography variant={'h5'}>₪129.99</Typography>
        </div>
      </CardBody>
    </Card>
  )
}


export function CardSale ({src,alt}) {
  return(
    <Card>
      <div className="position-relative">
        <img className={style.saleImg} src={sale} alt="" />
        <CardImg src={src} alt={alt}/>
      </div>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <Typography component={'h6'} variant={'tertiary'}>صغير</Typography>
          <CardTitle>العنوان الرئيسي</CardTitle>
        </div>
        <Typography component={'h6'} variant={'tertiary'}>بنفسجي</Typography>
        <CardDescription>الشنتة الكلاسيكية من نوع شانيل الجميلة المتعة</CardDescription>
        <div className="mt-3 d-flex justify-content-between">
          <CardButton variant={'secondary'}>   
              <FontAwesomeIcon icon={faCartPlus}  />
          </CardButton>
          <div className="d-flex gap-2 align-items-center">
            <Typography component={'p'} variant={'tertiary'} line={'above'}>₪150.99</Typography>
            <Typography component={'h5'}>₪129.99</Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export function ImageCard({ src, alt, text }) {
  return (
    <button className={style.imageCardBtn}>
      <div className={style.imageCardContainer}>
        <img className={style.imageCard} src={src} alt={alt} />
        <div className={style.overlay}>
          <span className={style.overlayText}>{text}</span>
        </div>
      </div>
    </button>
  );
}