
import style from './style.module.scss'
function RoundContainer(props) {
  const {className} = props
  return (
    <div className={`${style.roundContainer} ${className}`}>
      {props.children}
    </div>
  )
}

export default RoundContainer
