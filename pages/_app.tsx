import type { AppProps /*, AppContext */ } from 'next/app'
import Layout from 'components/Layout'
import { NextComponentType } from 'next'
import 'styles/globals.scss'
import { wrapper } from '../store'

type MyComponentType = NextComponentType & {
	container?: boolean
	title?: string
}
export type { MyComponentType }
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

export default wrapper.withRedux(MyApp)
