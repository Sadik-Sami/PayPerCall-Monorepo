import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://paypercall.com'),
};

export const revalidate = 3600;

export default function CMSLayout({ children }: { children: ReactNode }) {
	return (
		<div className='min-h-screen bg-background'>
			<div className=''>{children}</div>
		</div>
	);
}
