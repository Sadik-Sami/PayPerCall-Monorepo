import { Providers } from '@/components/providers';
import '@workspace/ui/globals.css';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { googleSansFlex } from './fonts';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from '@workspace/ui/components/sonner';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${googleSansFlex.className} antialiased`}>
				<Providers>
					<Navbar />
					{children}
					<Toaster richColors />
					<SpeedInsights />
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
