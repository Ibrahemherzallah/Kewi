import style from './typography.module.css'

const Typography = ({component,children,variant,line}) => {
  return(
    <p className = {` mb-1 ${style.typo} ${style[component]} ${style[variant]} ${style[line]}`}>{children}</p>
  )
}

export default Typography;