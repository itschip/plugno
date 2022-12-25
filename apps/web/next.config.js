/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		appDir: true,
		externalDir: true,
	},
	transpilePackages: ['@plugs/ui'],
};

module.exports = nextConfig;
