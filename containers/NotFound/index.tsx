import React, {FC} from 'react'
import style from './style.module.scss'

export interface NotFoundProps {
}

const NotFound: FC<NotFoundProps> = ()=>{
  return (
    <div className={style.notFound}>
      404 ~ not found
    </div>
  )
}


export default NotFound