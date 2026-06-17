import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://paypercall.com'),
};

export default function AppDevLayout({ children }: { children: ReactNode }) {
	return (
		<div className='min-h-screen bg-background'>
			<div className=''>{children}</div>
		</div>
	);
}

