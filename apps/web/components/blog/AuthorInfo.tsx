'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { AuthorBioModal } from './AuthorBioModal';
import type { Author } from '@/types/blog';

interface AuthorInfoProps {
	author: Author | null;
	updatedAt: string;
}

export function AuthorInfo({ author, updatedAt }: AuthorInfoProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	if (!author) return null;

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<>
			<div className='border-t border-b border-border py-6 my-8'>
				<div className='flex flex-col items-start gap-4'>
					{/* Updated Date */}
					<div className='text-sm text-muted-foreground'>
						<span className='italic font-medium'>Updated:</span> {formatDate(updatedAt)}
					</div>

					{/* Author Info */}
					<div className='flex items-center gap-4 flex-1'>
						{/* Author Image */}
						<div className='relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden bg-muted ring-2 ring-border shrink-0'>
							{author.image?.url ? (
								<Image
									src={author.image.url}
									alt={author.name}
									fill
									className='object-cover'
									sizes='64px'
								/>
							) : (
								<div className='flex items-center justify-center h-full w-full bg-primary text-primary-foreground text-lg font-semibold'>
									{getInitials(author.name)}
								</div>
							)}
						</div>

						{/* Author Name and Designation */}
						<div className='flex-1 min-w-0'>
							<div className='flex items-center gap-2 flex-wrap'>
								<span className='text-sm text-muted-foreground'>
									<span className='italic font-medium'>Reviewed by:</span>{' '}
									<span className='font-semibold text-foreground'>{author.name}</span>
								</span>
								{author.bio && (
									<button
										onClick={() => setIsModalOpen(true)}
										className='inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shrink-0'
										aria-label='View author bio'
									>
										<Plus className='h-3.5 w-3.5' />
									</button>
								)}
							</div>
							{author.designation && (
								<p className='text-sm text-muted-foreground mt-1'>{author.designation}</p>
							)}
						</div>
					</div>
				</div>
			</div>

			{author.bio && (
				<AuthorBioModal author={author} open={isModalOpen} onOpenChange={setIsModalOpen} />
			)}
		</>
	);
}

