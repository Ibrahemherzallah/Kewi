import style from './typography.module.css'

const Typography = ({component,children,variant,size,line,...props}) => {
  return(
    <p className = {` mb-1 ${style.typo} ${style[component]} ${style[variant]} ${style[line]} ${style[size]}`} {...props}>{children}</p>
  )
}

export default Typography;