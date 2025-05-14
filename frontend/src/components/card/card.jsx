import Button from "../button/button";
import Typography from "../typography/typography";
import style from "./card.module.css";
import {IconBtn} from "../icons/icons.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import {useState} from "react";

export function Card ({children,...props}){
  return(
    <div className={style.card} {...props}>{children}</div>
  )
}
export function CardImg ({alt,src,...props}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
      <div style={{ position: 'relative' }}>
        {!isImageLoaded && (
            <Skeleton height="19rem" width="100%" borderRadius={8} />
        )}

        <img
            className={style.img}
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() =>{console.log("testtt"); return setIsImageLoaded(true)} }
            style={{
              opacity: isImageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            {...props}
        />
      </div>
  );
}

export function CardTitle ({children}) {
  return(
    <Typography component={'h3'}>{children}</Typography>
  )
}

export function CardBody ({children}) {
  return(
    <div className={style.cardBody}>{children}</div>
  )
}

export function CardDescription ({children,...props}) {
  return(
    <Typography component={'p'} {...props}>{children}</Typography>
  )
}

export function CardButton ({size,variant,children,job,isSoldOut,...props}) {
  return(
      <IconBtn variant={'square'} size={size} job={job} color={isSoldOut ? 'tertiary' : 'primary'} {...props}>{children}</IconBtn>
  )
}