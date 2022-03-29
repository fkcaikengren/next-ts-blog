import React, { useEffect } from 'react'
import Home from 'containers/Home'

import { MyComponentType } from './_app'
import { wrapper } from 'store'
import { getLastestArticles, getRecommendedArticles } from 'services/articleApi'
import { getCategories } from 'services/categoryApi'

const HomePage: MyComponentType = () => {
	return <Home />
}
export default HomePage

export const getServerSideProps = wrapper.getServerSideProps(
	store => async () => {
		// initiate()构建一个actionCreator, dispatch后完成query数据填充
		await store.dispatch(getLastestArticles.initiate({ page: 0, pageSize: 6 }))
		await store.dispatch(getCategories.initiate(null))
		await store.dispatch(
			getRecommendedArticles.initiate({ page: 0, pageSize: 5 })
		)
		return {
			props: {},
		}
	}
)
