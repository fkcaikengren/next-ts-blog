import type { AppProps /*, AppContext */ } from 'next/app'
import Layout from 'components/Layout'
import { NextComponentType } from 'next'
import 'styles/globals.scss'
// import 'styles/iconfont.css'

type MyComponentType = NextComponentType & {
	container?: boolean
	title?: string
}
interface MyAppProps extends AppProps {
	Component: MyComponentType
}

function MyApp({ Component, pageProps }: MyAppProps) {
	return (
		<Layout title={Component.title} container={Component.container}>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
export type { MyComponentType }
