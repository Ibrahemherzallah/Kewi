import Button from "../button/button";
import Typography from "../typography/typography";
import style from "./card.module.css";

export function Card ({children,...props}){
  return(
    <div className={style.card}>{children}</div>
  )
}

export function CardImg ({alt,src}) {
  return(
    <img className={style.img} src={src} alt={alt} />
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

export function CardDescription ({children}) {
  return(
    <Typography component={'p'}>{children}</Typography>
  )
}

export function CardButton ({size,variant,children,...props}) {
  return(
    <Button variant={variant} size={size} {...props}>{children}</Button>
  )
}