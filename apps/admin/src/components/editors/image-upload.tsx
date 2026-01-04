import { useState, useCallback, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ImageData } from '@/types/web-dev-services.types';
import { uploadApi } from '@/services/upload.api';
import { toast } from 'sonner';

interface ImageUploadProps {
	value?: ImageData | null;
	onChange: (value: ImageData | null) => void;
	folder?: string;
	label?: string;
}

export function ImageUpload({ value, onChange, folder = 'paypercall', label = 'Image' }: ImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUpload = useCallback(
		async (file: File) => {
			if (!file.type.startsWith('image/')) {
				toast.error('Please select an image file');
				return;
			}

			if (file.size > 10 * 1024 * 1024) {
				toast.error('Image must be less than 10MB');
				return;
			}

			setIsUploading(true);
			try {
				const result = await uploadApi.uploadImage(file, folder);
				onChange({
					url: result.url,
					publicId: result.publicId,
					alt: value?.alt || '',
				});
				toast.success('Image uploaded successfully');
			} catch (error) {
				console.error('Upload error:', error);
				toast.error('Failed to upload image');
			} finally {
				setIsUploading(false);
			}
		},
		[folder, onChange, value?.alt]
	);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			handleUpload(file);
		}
	};

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsDragging(false);
			const file = e.dataTransfer.files[0];
			if (file) {
				handleUpload(file);
			}
		},
		[handleUpload]
	);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleRemove = async () => {
		if (value?.publicId) {
			try {
				await uploadApi.deleteImage(value.publicId);
			} catch (error) {
				console.error('Failed to delete image:', error);
			}
		}
		onChange(null);
	};

	const handleAltChange = (alt: string) => {
		if (value) {
			onChange({ ...value, alt });
		}
	};

	return (
		<div className='space-y-2'>
			<Label>{label}</Label>
			{value?.url ? (
				<div className='relative border border-border rounded-lg p-4 space-y-3'>
					<div className='relative w-full aspect-video max-w-xs bg-muted rounded-lg overflow-hidden'>
						<img src={value.url} alt={value.alt || ''} className='w-full h-full object-cover' />
						<Button
							type='button'
							variant='destructive'
							size='icon'
							className='absolute top-2 right-2 h-6 w-6'
							onClick={handleRemove}>
							<X className='h-4 w-4' />
						</Button>
					</div>
					<div className='space-y-1'>
						<Label htmlFor='alt-text' className='text-xs'>
							Alt Text
						</Label>
						<Input
							id='alt-text'
							value={value.alt || ''}
							onChange={(e) => handleAltChange(e.target.value)}
							placeholder='Describe the image...'
							className='text-sm'
						/>
					</div>
				</div>
			) : (
				<div
					className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
						isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
					}`}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}>
					{isUploading ? (
						<div className='flex flex-col items-center gap-2'>
							<Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
							<p className='text-sm text-muted-foreground'>Uploading...</p>
						</div>
					) : (
						<div className='flex flex-col items-center gap-2'>
							<Upload className='h-8 w-8 text-muted-foreground' />
							<p className='text-sm text-muted-foreground'>
								Drag and drop an image, or{' '}
								<button
									type='button'
									className='text-primary hover:underline'
									onClick={() => fileInputRef.current?.click()}>
									browse
								</button>
							</p>
							<p className='text-xs text-muted-foreground'>Max size: 10MB</p>
						</div>
					)}
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						className='hidden'
						onChange={handleFileChange}
					/>
				</div>
			)}
		</div>
	);
}

export default ImageUpload;

