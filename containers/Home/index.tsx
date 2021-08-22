import React, { FC } from 'react'
import Main from './Main'
import Side from './Side'
import style from './style.module.scss'

export interface HomeProps {}

const Home: FC<HomeProps> = () => {
	return (
		<div className={style.home}>
			<Main></Main>
			<Side></Side>
		</div>
	)
}

export default Home
