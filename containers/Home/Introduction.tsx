import React, { FC, useMemo } from 'react'
import RspImage from 'components/RspImage'
import { CalendarIcon, EyeIcon } from 'components/CustomIcon'
import style from './style.module.scss'
interface IProps {
	title: string
	paragraph: string
	category: string
	timestamp: number
	views: number
}
const Introduction: FC<IProps> = props => {
	const { title, paragraph = '', category, timestamp, views } = props

	const content = useMemo(() => {
		if (paragraph.length > 65) {
			return paragraph.substr(0, 65) + '[...]'
		} else {
			return paragraph
		}
	}, [paragraph])
	return (
		<div className={style.introduction}>
			<div className={style.info}>
				<h1>{title}</h1>
				<p>{content}</p>
				<div className={style.bar}>
					<span>心情随笔</span>
					<CalendarIcon size={14} />
					<span>2020-01-02</span>
					<div className={style.views}>
						<EyeIcon size={14} />
						<span>1990</span>
					</div>
				</div>
			</div>
			<RspImage
				src="/images/post.jpeg"
				mode="heightFix"
				containerClass={style.cover}
			/>
		</div>
	)
}

export default Introduction

// mode  定宽，定高
