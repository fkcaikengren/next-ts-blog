import { FC } from 'react'
import classNames from 'classnames'
import variables from 'styles/var.exports.module.scss'

interface SpinProps {
	color?: string
	size?: 'small' | 'medium' | 'large'
}
const Spin: FC<SpinProps> = ({
	color = variables.primaryColor,
	size = 'small',
}) => {
	const { spinPrefixCls } = variables
	const classes = classNames(spinPrefixCls, {
		[`${spinPrefixCls}-${size}`]: true,
	})
	const spinStyle = {
		borderColor: `${color} transparent transparent transparent`,
	}
	return (
		<div className={classes}>
			{[0, 1, 2, 3].map(item => (
				<div style={spinStyle} key={item}></div>
			))}
		</div>
	)
}

export default Spin
