/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		appDir: true,
		externalDir: true,
	},
	webpack: (config) => {
		config.resolve.alias['react/jsx-runtime'] = require.resolve('react/jsx-runtime');
		config.resolve.alias['react/jsx-dev-runtime'] = require.resolve('react/jsx-dev-runtime');
		return config;
	},
};

module.exports = nextConfig;
