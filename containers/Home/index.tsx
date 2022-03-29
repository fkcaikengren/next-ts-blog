import React, { FC } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Sidebar from 'components/Sidebar'
import { getCategories } from 'services/categoryApi'
import { getLastestArticles, getRecommendedArticles } from 'services/articleApi'
import RoundContainer from 'components/RoundContainer'
import TitleLine from './components/TitleLine'
import Introduction from './components/Introduction'
import style from './style.module.scss'

export interface HomeProps {}

const Home: FC<HomeProps> = () => {
	const articleQuery = useSelector(
		getLastestArticles.select({ page: 0, pageSize: 6 })
	)
	const { data } = articleQuery
	return (
		<div className="wrapper">
			<RoundContainer className="main">
				<TitleLine title="最新文章" />
				{data &&
					data.results.map((article: any) => (
						<Introduction
							key={article.id}
							title={article.title}
							summary={article.summary}
							category="Javascript"
							updateDate={article.updatedAt.substr(0, 10)}
							views={article.views}
						/>
					))}
			</RoundContainer>
			<Sidebar
				firstDescriptor={{
					title: '文章分类',
					selector: getCategories.select(null),
				}}
				secondDescriptor={{
					title: '推荐阅读',
					selector: getRecommendedArticles.select({ page: 0, pageSize: 5 }),
				}}
			/>
		</div>
	)
}

export default Home
