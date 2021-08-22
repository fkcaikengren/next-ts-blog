import { CSSProperties, FC } from 'react'
import classNames from 'classnames'

interface CustomIconProps {
	name: string
	size?: number
	color?: string
	style?: CSSProperties
}
interface IProps {
	size?: number
	color?: string
	style?: CSSProperties
}

const CustomIcon: FC<CustomIconProps> = ({
	name,
	size = 18,
	color = '#aaa',
	style = {},
}) => {
	return (
		<i
			className={classNames('iconfont', name)}
			style={{ ...style, fontSize: `${size}px`, color }}
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
	<CustomIcon name="icon-fenlei" {...props} />
)

export const EyeIcon: FC<IProps> = props => (
	<CustomIcon name="icon-kanguo" {...props} />
)

export const LoveIcon: FC<IProps> = props => (
	<CustomIcon name="icon-xihuan" {...props} />
)

export const CalendarIcon: FC<IProps> = props => (
	<CustomIcon name="icon-rili" {...props} />
)

export default CustomIcon
