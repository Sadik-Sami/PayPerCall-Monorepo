import { Providers } from '@/components/shared/Providers';
import '@workspace/ui/globals.css';
import { Navbar } from '@/components/shared/navbar/Navbar';
import { Footer } from '@/components/shared/footer/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from '@workspace/ui/components/sonner';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Core Closer',
	description: 'Core Closer',
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-icon.png',
	},
	manifest: '/manifest.json',
	appleWebApp: {
		title: 'Core Closer',
	},
	alternates: {
		canonical: 'https://corecloser.com',
	},
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		type: 'website',
		title: 'Core Closer',
		description: 'Core Closer',
		url: 'https://corecloser.com',
		images: ['/favicon.ico'],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Core Closer',
		description: 'Core Closer',
		images: ['/favicon.ico'],
	},
};

import { Google_Sans_Flex, Inter } from 'next/font/google';

const headingFont = Google_Sans_Flex({
	subsets: ['latin'],
	weight: 'variable',
	variable: '--font-heading',
	display: 'optional',
	fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
	adjustFontFallback: false,
});

const bodyFont = Inter({
	subsets: ['latin'],
	weight: 'variable',
	variable: '--font-body',
	display: 'swap',
	fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${headingFont.variable} ${bodyFont.variable} font-body antialiased`}>
				<Providers>
					<Navbar />
					{children}
					<Toaster richColors position='top-right' />
					<SpeedInsights />
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
