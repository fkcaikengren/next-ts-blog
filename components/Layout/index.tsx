import classNames from 'classnames'
import Header from 'components/Header'
import Affix from 'components/Affix'
import style from './style.module.scss'

type IProps = { title?: string; container?: boolean; children?: object }

function Layout({ title, container = true, children }: IProps): JSX.Element {
	return (
		<div className={classNames({ [style.layout]: container })}>
			{container && (
				<div className={style.left}>
					<Affix>
						<Header title={title}></Header>
					</Affix>
				</div>
			)}
			{container && (
				<div className={style.top}>
					<Header title={title}></Header>
				</div>
			)}
			<div className={style.right}>{children}</div>
		</div>
	)
}

export default Layout
