import React, {
	FC,
	CSSProperties,
	useState,
	useEffect,
	useCallback,
	useRef,
} from 'react'
import ResizeObserver from 'rc-resize-observer'
import throttle from 'lodash/throttle'

interface AffixProps {
	offsetTop?: number
}
const Affix: FC<AffixProps> = ({ children, offsetTop = 0 }) => {
	const placeholderRef = useRef<HTMLDivElement>(null)
	const fixedRef = useRef<HTMLDivElement>(null)
	const [fixedStyle, setFixedStyle] = useState<CSSProperties>({
		width: '100%',
		height: '100%',
	})

	const updatePosition = useCallback(
		({ width, height }) => {
			setFixedStyle({
				width: `${width}px`,
				height: `${height}px`,
			})
		},
		[setFixedStyle]
	)

	const onScroll = useCallback<() => void>(() => {
		if (fixedRef.current && placeholderRef.current) {
			// const {} = fixedRef.current.getBoundingClientRect()
			const { top, width, height } =
				placeholderRef.current.getBoundingClientRect()
			if (top - offsetTop <= 0) {
				//改变状态，让元素固定
				if (fixedStyle.position !== 'fixed') {
					// console.log('fixed')
					setFixedStyle({
						position: 'fixed',
						top: offsetTop,
						width: `${width}px`,
						height: `${height}px`,
					})
				}
			} else {
				// 取消固定
				if (fixedStyle.position === 'fixed') {
					// console.log('unlock fixed')
					setFixedStyle({
						width: `${width}px`,
						height: `${height}px`,
					})
				}
			}
		}
	}, [fixedRef, offsetTop, fixedStyle, setFixedStyle])

	useEffect(() => {
		document.addEventListener('scroll', onScroll, false)
		return () => {
			document.removeEventListener('scroll', onScroll)
		}
	}, [onScroll])

	useEffect(() => {
		if (placeholderRef.current) {
			const { width, height } = placeholderRef.current.getBoundingClientRect()
			setFixedStyle({
				width: `${width}px`,
				height: `${height}px`,
			})
		}
	}, [placeholderRef, setFixedStyle])

	const placeholderStyle: CSSProperties = {
		minHeight: '10px',
		width: '100%',
		// background: 'pink',
	}
	return (
		<ResizeObserver onResize={updatePosition}>
			<div ref={placeholderRef} style={{ ...placeholderStyle }}>
				<div ref={fixedRef} style={{ ...fixedStyle }}>
					{children}
				</div>
			</div>
		</ResizeObserver>
	)
}

export default Affix
