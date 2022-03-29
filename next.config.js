module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['tenfei01.cfp.cn'],
	},

	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.module.rules.push({
			test: /\.(woff|woff2|eot|ttf|svg)$/,
			loader: 'url-loader',
		})

		return config
	},
}
