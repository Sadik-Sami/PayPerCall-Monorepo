'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import type { Author } from '@/types/blog';
import Image from 'next/image';

interface AuthorBioModalProps {
	author: Author;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function AuthorBioModal({ author, open, onOpenChange }: AuthorBioModalProps) {
	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<div className='flex flex-col items-center text-center space-y-4 pb-4'>
						<div className='relative h-20 w-20 rounded-full overflow-hidden bg-muted ring-2 ring-border'>
							{author.image?.url ? (
								<Image
									src={author.image.url}
									alt={author.name}
									fill
									className='object-cover'
									sizes='80px'
								/>
							) : (
								<div className='flex items-center justify-center h-full w-full bg-primary text-primary-foreground text-2xl font-semibold'>
									{getInitials(author.name)}
								</div>
							)}
						</div>
						<div>
							<DialogTitle className='text-2xl mb-2'>{author.name}</DialogTitle>
							{author.designation && (
								<p className='text-muted-foreground text-sm'>{author.designation}</p>
							)}
						</div>
					</div>
				</DialogHeader>
				{author.bio && (
					<div className='prose prose-neutral dark:prose-invert max-w-none'>
						<div className='whitespace-pre-wrap text-sm leading-relaxed'>{author.bio}</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}

