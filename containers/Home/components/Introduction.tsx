import React, { FC, useMemo } from 'react'
import RspImage from 'components/RspImage'
import {
	CategoryIcon,
	CalendarIcon,
	EyeIcon,
	LoveLineIcon,
	LoveSolidIcon,
} from 'components/CustomIcon'
import style from '../style.module.scss'
interface IProps {
	title: string
	summary: string
	category: string
	updateDate: number
	views: number
}
const Introduction: FC<IProps> = props => {
	const { title, summary = '', category, updateDate, views } = props

	const content = useMemo(() => {
		if (summary.length > 65) {
			return summary.substr(0, 65) + '[...]'
		} else {
			return summary
		}
	}, [summary])
	return (
		<div className={style.introduction}>
			<div className={style.info}>
				<h1>{title}</h1>
				<p>{content}</p>
				<div className={style.bar}>
					<CategoryIcon size={14} />
					<span>{category}</span>
					<CalendarIcon size={14} />
					<span>{updateDate}</span>
					<EyeIcon size={14} />
					<span>{views}</span>
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
