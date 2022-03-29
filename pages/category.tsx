import React, { useEffect } from 'react'
import { MyComponentType } from './_app'
import Button from 'components/common/button'
import { wrapper } from 'store'
import { getCategories, useGetCategoriesQuery } from 'services/categoryApi'

const CategoryPage: MyComponentType = () => {
	return (
		<div>
			<Button text="View it" />
		</div>
	)
}
CategoryPage.title = '分类'
export default CategoryPage

export const getServerSideProps = wrapper.getServerSideProps(
	store => async () => {
		// const result = await store.dispatch(getCategories.initiate(null)) //return promise (configStore产生的store具备处理异步promise能力，并返回promise)
		// const { data, status, error } = result
		// console.log(result)
	}
)

// export const getServerSideProps = () => {

// 	return {
// 		props: {},
// 	}
// }
/*
 	Next的getServerSideProps必须返回props，
	wrapper.getServerSideProps默认会将store的state作为props.initialState传入
 */
