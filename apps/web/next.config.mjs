/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@workspace/ui'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'randomuser.me',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'ik.imagekit.io',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'html.tailus.io',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
