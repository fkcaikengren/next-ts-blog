import React, { FC, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { getTags } from 'services/tagApi'
import { getArticleById, getRecommendedArticles } from 'services/articleApi'
import Sidebar from 'components/Sidebar'
import style from './style.module.scss'
import RoundContainer from 'components/RoundContainer'
import hljs from 'highlight.js'

const content = `<article id="js-article-wrapper">
<div class="markdown-body">
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2 id='hooks'>Hooks</h2>
<p>useState的困惑？</p>
<pre><code class='language-javascript' lang='javascript'>useCustom(){
	const [isOpen, setIsOpen] = useState(true)
  return isOpen
}

ComponentA=()=&gt;{
  useCustom()
}

ComponentA=()=&gt;{
  useCustom()
}

并不能共享isOpen，说明在组件内useState产生的是同一变量，上述的例子中生成了两个isOpen,互不干扰。
</code></pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2 id='webpack'>webpack</h2>
<p><a href='https://lvzhenbang.github.io/webpack-book/zh/appendices/02_hmr.html#启用hmr'>webpack surviveJS</a></p>
<h4 id='wds'>WDS</h4>
<p>webpack-dev-server（WDS） </p>
<p>open:true 的作用是刷新浏览器，当js更新时会刷新整个页面，即重新请求页面（修改css则不会刷新，只刷新样式）。当启动HRM后可以实现局部刷新，即不会重新请求。</p>
<p>&nbsp;</p>
<p>同时支持webpack的HRM, wds上需要开启，也需要在客户端接入wds的接口</p>
<p>wds流程： 修改文件-&gt;重新编译-&gt;刷新浏览器-&gt;重新请求文件-&gt;渲染</p>
<h4 id='hrm'>HRM</h4>
<ol start='' >
<li>HRM是基于WDS。特点：局部更新</li>
<li>更新样式要用style-loader</li>
<li>更新js则困难些，因为js有状态。此时可用第三方hrm包，如react-hot-loader, react-refresh</li>

</ol>
<p>启用HRM步骤：</p>
<ol start='' >
<li>WDS 设置hot:true</li>
<li>webpack添加webpack.HotModuleReplacementPlugin（保证把更新通知wds）</li>
<li>根据webpack configuration运行WDS</li>
<li>webpack里，通过module.hot.accept实现HRM接口 （如果没有这一步，尽管通知了wds但是nothing hot updated）</li>

</ol>
<p>本质 监听路径，替换并重新渲染组件</p>
<pre><code>import component from &quot;./component&quot;;

let demoComponent = component();

document.body.appendChild(demoComponent);

// HMR interface
if (module.hot) {
  // Capture hot update
  module.hot.accept(&quot;./component&quot;, () =&gt; {
    const nextComponent = component();

    // Replace old content with the hot loaded one
    document.body.replaceChild(nextComponent, demoComponent);

    demoComponent = nextComponent;
  });
}
</code></pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h4 id='修复'>修复</h4>
<h5 id='1修改js-浏览器自动刷新后发现页面没有更新'>1.修改js, 浏览器自动刷新后，发现页面没有更新</h5>
<p>细致描述：在ssr中可能出现server端代码未更新，client端代码实际是更新的。</p>
<p>原因：</p>
<p>client端poll给了500</p>
<pre><code>//devServerOptions
watchOptions:{
    aggregateTimeout: 500,
    ignored: /node_modules/,
    poll: 500,
},
</code></pre>
<p>server端poll给了2000</p>
<pre><code>compiler.watch({
    aggregateTimeout: 800,
    ignored: /node_modules/,
    poll: 2000,  
  }, ()=&gt;null)
</code></pre>
<p>使用watchOptions替代watch</p>
<p>aggregateTimeout 延迟时间（把这个时间段的修改聚集到一起修改）</p>
<p>poll 轮询时间（xx秒检查一次是否存在文件更新）</p>
<p><strong>如果只是设置hot:true （整个页面刷新），这会导致服务端和客户端渲染不一致。但是如果开启了HRM（局部刷新）则不会产生问题  (使用react-loadable可以重现这个问题)</strong></p>
<p>&nbsp;</p>
<p>当server和client不一致，React-loadable会报错，并保存client端的代码，（server的代码更新，client端代码未更新）故表现出没有更新</p>
<p>哪怕server和client的poll时间设置成一致也无法解决这个问题，这是由于更新时间不一致的问题。</p>
<p><img src="file:///Users/gavin/Library/Application%20Support/typora-user-images/image-20210730165910816.png?lastModify=1627959195" referrerpolicy="no-referrer" alt="image-20210730165910816"></p>
<p><strong>解决</strong>：</p>
<p>1）当server和client不一致时渲染server（@loadable/component就是这么做的！）</p>
<p>&nbsp;</p>
<p>2）延长server的poll时间</p>
<p>可以缓解server和client不一致的问题</p>
<p>&nbsp;</p>
<p>3）关闭server rendering</p>
<p>server有变化就会被nodemon重启，client有变化就会被WDS重启</p>
<p>但为什么WDS刷新后，却没有修改内容，就client更新了页面却没变化</p>
<p>唯一的解释就是WDS compile完成前就刷新了浏览器 ！！</p>
<p>假设编译和刷新浏览器同时开始，如果编译时间太长，浏览器先刷新了，那么就会出现这种问题</p>
<p>这一点可以通过实际操作得到验证！！</p>
<p><strong>解决办法只有HMR</strong></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>注意：poll设置的时间比aggregateTimeout还短可能会存在问题</p>
<p>&nbsp;</p>
<h5 id='2开启hrm--修改js后页面未变化'>2.开启HRM , 修改js后页面未变化</h5>
<p>开启HRM, 不会刷新浏览器。js修改-&gt;通知DOM更新-&gt;WDS重启+node重启。</p>
<p>不刷新浏览器就意味着没有服务端客户端渲染不一致问题，也没有上述先刷新浏览器后WDS重启的问题</p>
<p>原因：修改后没有</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>HRM 修改后会不会刷新页面，但是会重新请求js补丁(包含了js和css的修改)</p>
<p><img src="file:///Users/gavin/Library/Application%20Support/typora-user-images/image-20210730174607252.png?lastModify=1627959195" referrerpolicy="no-referrer" alt="image-20210730174607252"></p>
<p>截图里，重新请求了css有点没必要。</p>
<p>编译完成，通知浏览器请求补丁xx-hot-update.js，</p>
<p>浏览器请求拿到xx-hot-update.js，然后运行该js把原来的模块替换掉。</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2 id='elasticsearch'>elasticsearch</h2>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h3 id='searchkit'>searchkit</h3>
<p>&nbsp;</p>
<p>searchkit处理 elastic后的Query结构</p>
<pre><code class='language-javascript' lang='javascript'>type Query{
	results: ResultSet
}
type ResultSet{
  hits: SKHitResults
  facet: SKFacetSet
  facets: [SKFacetSet]
}
type SKHitResults{
  items: SKHit
  page: SKPageInfo
  sortedBy: String
}
type SKHit{
  id: ID!
  fields: CustomType
}
//自定义数据type
type CustomType{
  id: ID!
  name: String!
}
</code></pre>
<p>&nbsp;</p>
<h3 id='产品分类设计'>产品分类设计</h3>
<p>问题：</p>
<p>1.上传到elasticsearch的数据结构是怎么样的？</p>
<p>&nbsp;</p>
<p>2.如何做到筛选查询的</p>
<p>&nbsp;</p>
<p>3.分类数据中，前端的taxon有什么用？</p>
<p>&nbsp;</p>	
</div>

</article>`

export interface PostProps {}

const Post: FC<PostProps> = () => {
	const router = useRouter()
	const { id } = router.query
	const articleQuery = useSelector(getArticleById.select({ id }))
	const { data } = articleQuery

	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (!ref.current) return
		const blocks: NodeList = ref.current.querySelectorAll('pre code')
		blocks.forEach((block: Node) => {
			hljs.highlightBlock(block as HTMLElement)
		})
	}, [])

	return (
		<div className="wrapper">
			<RoundContainer className="main">
				<div
					ref={ref}
					dangerouslySetInnerHTML={{
						__html: content,
					}}
				/>
			</RoundContainer>
			<Sidebar
				firstDescriptor={{
					title: '推荐阅读',
					selector: getRecommendedArticles.select({ page: 0, pageSize: 5 }),
				}}
				secondDescriptor={{
					title: '文章标签',
					selector: getTags.select(null),
				}}
			/>
		</div>
	)
}

export default Post
