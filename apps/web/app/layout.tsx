import { Providers } from '@/components/providers';
import '@workspace/ui/globals.css';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { gesistSans, googleSansFlex } from './fonts';
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${googleSansFlex.variable} ${gesistSans.variable} antialiased`}>
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
