import Button from "../button/button";
import Typography from "../typography/typography";
import style from "./card.module.css";
import {IconBtn} from "../icons/icons.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

export function Card ({children,...props}){
  return(
    <div className={style.card} {...props}>{children}</div>
  )
}

export function CardImg ({alt,src,...props}) {
  return(
    <img className={style.img} src={src} alt={alt} {...props}/>
  )
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