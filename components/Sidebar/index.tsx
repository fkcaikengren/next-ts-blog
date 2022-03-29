import React, { FC, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import RoundList from 'components/RoundList'
import Affix from 'components/common/affix'
import style from './style.module.scss'

interface SideProps {
	firstDescriptor: {
		title: string
		selector: any
	}
	secondDescriptor: {
		title: string
		selector: any
	}
}

const Sidebar: FC<SideProps> = ({
	firstDescriptor,
	secondDescriptor,
}: SideProps) => {
	const firstQuery = useSelector(firstDescriptor.selector)
	const secondQuery = useSelector(secondDescriptor.selector)
	const firstData = useMemo(() => {
		const { data } = firstQuery
		if (!data) return {}
		return {
			title: {
				text: firstDescriptor.title,
			},
			list: data.results.map(item => ({
				text: item.name || item.title,
				link: '/',
			})),
		}
	}, [firstQuery, firstDescriptor.title])
	const secondData = useMemo(() => {
		const { data } = secondQuery
		if (!data) return {}
		return {
			title: {
				text: secondDescriptor.title,
			},
			list: data.results.map(item => ({
				text: item.name || item.title,
				link: '/',
			})),
		}
	}, [secondQuery, secondDescriptor.title])
	return (
		<div className={style.sidebar}>
			<Affix>
				<RoundList
					data={firstData}
					className={style.box}
					titleClass={style.title}
					listClass={style.list}
					itemClass={style.item}
				/>
				<RoundList
					data={secondData}
					className={style.box}
					titleClass={style.title}
					listClass={style.list}
					itemClass={style.item}
				/>
			</Affix>
		</div>
	)
}

export default Sidebar

// const categoryQuery = useSelector(getCategories.select(null))
// const recommendedArticleQuery = useSelector(
//   getRecommendedArticles.select({ page: 0, pageSize: 5 })
// )
// const tagQuery = useSelector(getTags.select(null))
