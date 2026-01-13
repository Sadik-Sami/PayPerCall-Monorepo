import type { ReactNode } from 'react';

export const revalidate = 3600;

export default function WebDevLayout({ children }: { children: ReactNode }) {
	return (
		<div className='min-h-screen bg-background'>
			<div className='px-4 py-10'>{children}</div>
		</div>
	);
}
