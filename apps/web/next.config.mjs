/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@workspace/ui'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'randomuser.me',
				pathname: '/api/portraits/**',
			},
		],
	},
};

export default nextConfig;
