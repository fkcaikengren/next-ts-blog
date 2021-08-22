import React, { FC } from 'react'
import style from './style.module.scss'

interface IProps {
	title?: string
}
const Segment: FC<IProps> = ({ title = '' }) => {
	return <div className={style.segment}>{title && <span>{title}</span>}</div>
}

export default Segment
