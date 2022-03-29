import React, { FC, useState, useMemo, useCallback } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import variables from 'styles/var.exports.module.scss'
import Spin from '../spin'

interface InternalButtonProps {
	type?: 'button' | 'submit' // raw btton type
	href?: string // where to link
	color?: string
	background?: string
	shape?: 'default' | 'square' | 'round'
	size?: 'small' | 'medium' | 'large'
	text?: string
	leftIcon?: JSX.Element
	rightIcon?: JSX.Element
	loadIcon?: JSX.Element

	block?: boolean
	border?: boolean
	disabled?: boolean
	loading?: boolean
	hover?: boolean
	disabledColor?: string
	hoverStyle?: React.CSSProperties
	style?: React.CSSProperties
	onClick?: React.MouseEventHandler<HTMLElement>
}
// InternalButton
const InternalButton: FC<InternalButtonProps> = ({
	type = 'button',
	href = '',
	color = 'white',
	background = 'primary',
	shape = 'default',
	size = 'medium',
	text = '',
	leftIcon = '',
	rightIcon = '',
	loadIcon = <Spin />,
	block = '',
	border = true,
	disabled = false,
	loading = false,
	hover = false,
	disabledColor = '#dfdfdf',
	hoverStyle = {},
	style: propStyle = {},
	onClick,
	...rest
}) => {
	const [hovering, setHovering] = useState(false)
	const { btnPrefixCls } = variables
	const classes = classNames(btnPrefixCls, {
		[`${btnPrefixCls}-color-primary`]: color === 'primary',
		[`${btnPrefixCls}-background-primary`]: background === 'primary',
		[`${btnPrefixCls}-${shape}`]: shape !== 'default' && shape,
		[`${btnPrefixCls}-${size}`]: true,
		[`${btnPrefixCls}-hover`]: hover && hovering && !hoverStyle,
	})

	let borderColor
	if (disabled) {
		borderColor = disabledColor
	} else {
		borderColor =
			color === 'primary' || background === 'primary'
				? variables.primaryColor
				: color
	}
	const btnStyle = {
		...(color !== 'primary' && { color }),
		...(background !== 'primary' && { background }),
		...(block && { width: '100%' }),
		border: border ? `1px solid ${borderColor}` : 'none',
		...(hover && hovering && !!hoverStyle && hoverStyle),
		...(disabled && {
			background: disabledColor,
		}),
		...propStyle,
	}

	const hoverHandlers = useMemo(() => {
		if (disabled || loading) return {}

		return {
			onMouseEnter: () => {
				setHovering(true)
			},
			onMouseLeave: () => {
				setHovering(false)
			},
			onTouchStart: () => {
				setHovering(true)
			},
			onTouchEnd: () => {
				setHovering(false)
			},
		}
	}, [disabled, loading, setHovering])

	const handleClick = useCallback(
		event => {
			if (disabled || loading) {
				event.preventDefault()
				return
			}
			onClick && onClick(event)
		},
		[disabled, loading, onClick]
	)
	const childrenElement = (
		<>
			<div
				className={classNames(`${btnPrefixCls}-content`, {
					[`${btnPrefixCls}-hidden`]: loading && !disabled,
				})}
			>
				{!!leftIcon && leftIcon}
				{text && (
					<span style={{ ...(disabled && { color: '#aaa' }) }}>{text}</span>
				)}
				{!!rightIcon && rightIcon}
			</div>
			{loading && !disabled && (
				<div className={`${btnPrefixCls}-loading`}> {loadIcon} </div>
			)}
		</>
	)

	if (href) {
		return (
			<Link href={href}>
				<a className={classes} style={btnStyle} {...hoverHandlers} {...rest}>
					{childrenElement}
				</a>
			</Link>
		)
	}

	return (
		<button
			type={type}
			className={classes}
			style={btnStyle}
			onClick={handleClick}
			{...hoverHandlers}
			{...rest}
		>
			{childrenElement}
		</button>
	)
}
export default InternalButton
// React.forwardRef((props, ref) => (
//   <button ref={ref} className="FancyButton">
//     {props.children}
//   </button>
// ));;
