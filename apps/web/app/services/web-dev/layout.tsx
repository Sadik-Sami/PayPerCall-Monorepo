import type { ReactNode } from 'react';

export const revalidate = 3600;

export default function WebDevLayout({ children }: { children: ReactNode }) {
	return (
		<div className='min-h-screen bg-background'>
			<div className='px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-14'>
				{children}
			</div>
		</div>
	);
}
