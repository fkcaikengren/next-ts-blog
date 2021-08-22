import classNames from 'classnames'
import { CSSProperties, FC, useMemo } from 'react'
import style from './style.module.scss'

interface IProps {
	src: string
	alt?: string
	containerStyle?: object
	containerClass?: string
	ratio?: number
	mode?: 'widthFix' | 'heightFix'
}

const RspImage: FC<IProps> = props => {
	const {
		src,
		alt = '',
		containerStyle = {},
		containerClass = '',
		ratio = 1,
		mode = 'contain',
	} = props

	const wrapperStyle: CSSProperties = useMemo(
		() =>
			'heightFix' === mode
				? {
						height: '100%',
				  }
				: {
						width: '100%',
						position: 'relative',
						paddingTop: `${ratio * 100}%`,
				  },
		[mode, ratio]
	)
	const imgStyle: CSSProperties = useMemo(
		() =>
			'heightFix' === mode
				? {
						height: '100%',
				  }
				: {
						width: '100%',
				  },
		[mode]
	)

	return (
		<div
			className={classNames(style.rspImage, containerClass)}
			style={{ position: 'relative', ...containerStyle }}
		>
			<div className={style.wrapper} style={wrapperStyle}>
				<img src={src} alt={alt} style={imgStyle} />
			</div>
		</div>
	)
}

export default RspImage

/*
  widthFix: 需要你设置容器的宽度，同时需要你设置ratio(宽高比)
  heightFix: 需要你设置容器的高度
*/
