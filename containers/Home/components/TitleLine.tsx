import React, { FC } from 'react'
import style from '../style.module.scss'

interface IProps {
	title?: string
}
const TitleLine: FC<IProps> = ({ title = '' }) => {
	return <div className={style.segment}>{title && <span>{title}</span>}</div>
}

export default TitleLine
