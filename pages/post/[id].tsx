import React from 'react'
import { MyComponentType } from '../_app'
import { wrapper } from 'store'
import { getArticleById, getRecommendedArticles } from 'services/articleApi'
import { getTags } from 'services/tagApi'
import Post from 'containers/Post'

const PostPage: MyComponentType = () => {
	return <Post />
}
PostPage.title = '文章'
export default PostPage

export const getServerSideProps = wrapper.getServerSideProps(
	store =>
		async ({ params }) => {
			const { id } = params
			await store.dispatch(getArticleById.initiate({ id }))
			await store.dispatch(getTags.initiate(null))
			await store.dispatch(
				getRecommendedArticles.initiate({ page: 0, pageSize: 5 })
			)
			return {
				props: {},
			}
		}
)
