import React, { FC } from 'react'
import RoundList from 'components/RoundList'
import Affix from 'components/Affix'
import style from './style.module.scss'

const data1 = {
	title: {
		text: '分类目录',
		link: '/',
	},
	list: [
		{
			text: '工作笔记',
			link: '/',
		},
		{
			text: '心情随笔',
			link: '/',
		},
		{
			text: 'Javascript',
			link: '/',
		},
	],
}

const data2 = {
	title: {
		text: '近期文章',
		link: '/',
	},
	list: [
		{
			text: '剪影流殇，光影华年',
			link: '/',
		},
		{
			text: '我想走遍世界每一个角落',
			link: '/',
		},
		{
			text: '下辈子，我想当个主子',
			link: '/',
		},
		{
			text: '二、ts中函数声明和实现分离的写法',
			link: '/',
		},
	],
}

interface SideProps {}

const Side: FC<SideProps> = () => {
	return (
		<div className={style.side}>
			<Affix>
				<RoundList
					data={data1}
					className={style.box}
					titleClass={style.title}
					listClass={style.list}
					itemClass={style.item}
				/>
				<RoundList
					data={data2}
					className={style.box}
					titleClass={style.title}
					listClass={style.list}
					itemClass={style.item}
				/>
			</Affix>
		</div>
	)
}

export default Side
