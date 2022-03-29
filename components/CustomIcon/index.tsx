import { CSSProperties, FC } from 'react'
import classNames from 'classnames'

interface CustomIconProps {
	name: string
	size?: number
	color?: string
	marginLeft?: number
	marginRight?: number
	style?: CSSProperties
}
interface IProps {
	size?: number
	color?: string
	marginLeft?: number
	marginRight?: number
	style?: CSSProperties
}

const CustomIcon: FC<CustomIconProps> = ({
	name,
	size = 18,
	color = '#aaa',
	marginLeft = 0,
	marginRight = 0,
	style = {},
}) => {
	return (
		<i
			className={classNames('iconfont', name)}
			style={{
				...style,
				fontSize: `${size}px`,
				marginLeft: `${marginLeft}px`,
				marginRight: `${marginRight}px`,
				color,
			}}
		/>
	)
}

export const BiliIcon: FC<IProps> = props => (
	<CustomIcon name="icon-bilibili-line" {...props} />
)

export const WeixinIcon: FC<IProps> = props => (
	<CustomIcon name="icon-weixin" {...props} />
)

export const MiniProgramIcon: FC<IProps> = props => (
	<CustomIcon name="icon-xiaochengxu" {...props} />
)

export const CategoryIcon: FC<IProps> = props => (
	<CustomIcon name="icon-fenleifenji" {...props} />
)

export const EyeIcon: FC<IProps> = props => (
	<CustomIcon name="icon-kanguo" {...props} />
)

export const LoveLineIcon: FC<IProps> = props => (
	<CustomIcon name="icon-xihuan" {...props} />
)

export const LoveSolidIcon: FC<IProps> = props => (
	<CustomIcon name="icon-aixin" {...props} />
)

export const CalendarIcon: FC<IProps> = props => (
	<CustomIcon name="icon-rili" {...props} />
)

export default CustomIcon
