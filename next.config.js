/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ['res.cloudinary.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
	},
	env: {
		GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
	},
};

module.exports = nextConfig
