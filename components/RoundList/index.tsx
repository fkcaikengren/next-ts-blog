import Link from 'next/link'
import RoundContainer from 'components/RoundContainer'

type LinkItem = {
	text: string
	link: string
}

export interface RoundListProps {
	className?: string
	titleClass?: string
	listClass?: string
	itemClass?: string
	data: {
		title: LinkItem
		list: LinkItem[]
	}
}

export interface RoundListType {
	(props: RoundListProps): JSX.Element
}

const RoundList: RoundListType = ({
	data,
	className = '',
	titleClass = '',
	listClass = '',
	itemClass = '',
}) => {
	const { title, list } = data
	return (
		<RoundContainer className={className}>
			<div>
				<div className={titleClass}>{title.text}</div>
				<ul className={listClass}>
					{list.map((item, i) => (
						<li key={i} className={itemClass}>
							<Link href="/">{item.text}</Link>
						</li>
					))}
				</ul>
			</div>
		</RoundContainer>
	)
}

export default RoundList
