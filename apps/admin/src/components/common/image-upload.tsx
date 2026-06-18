import { useState, useRef } from 'react';
import { ImagePlus, X, UploadCloud, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { uploadsApi, uploadToCloudinary } from '@/services/uploads.api';

interface ImageUploadProps {
	value?: string | null;
	alt?: string | null;
	folder?: string;
	onChange: (next: { url: string; alt?: string } | null) => void;
	disabled?: boolean;
}

export default function ImageUpload({ value, alt, folder, onChange, disabled }: ImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUpload = async (file: File) => {
		try {
			setIsUploading(true);
			const signature = await uploadsApi.getCloudinarySignature(folder);
			const upload = await uploadToCloudinary({
				cloudName: signature.cloudName,
				apiKey: signature.apiKey,
				timestamp: signature.timestamp,
				signature: signature.signature,
				folder: signature.folder,
				file,
			});
			onChange({ url: upload.secure_url, alt: alt || '' });
			toast.success('Image uploaded successfully');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to upload image';
			toast.error(message);
		} finally {
			setIsUploading(false);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			void handleUpload(file);
		}
		// Reset input so the same file can be selected again if needed
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleRemove = () => {
		onChange(null);
	};

	const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (value) {
			onChange({ url: value, alt: e.target.value });
		}
	};

	return (
		<div className="space-y-4">
			<div className="relative overflow-hidden rounded-lg border border-border bg-muted/50 transition-colors flex flex-col items-center justify-center p-4">
				{isUploading ? (
					<div className="flex w-full flex-col items-center justify-center gap-2 aspect-video">
						<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
						<p className="text-sm text-muted-foreground">Uploading...</p>
					</div>
				) : value ? (
					<div className="relative group w-full aspect-video">
						<img
							src={value}
							alt={alt || 'Uploaded preview'}
							className="h-full w-full object-cover rounded-md"
						/>
						<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-md">
							<Button
								type="button"
								variant="secondary"
								size="sm"
								onClick={() => fileInputRef.current?.click()}
								disabled={disabled}
							>
								<UploadCloud className="h-4 w-4 mr-2" />
								Replace
							</Button>
							<Button
								type="button"
								variant="destructive"
								size="sm"
								onClick={handleRemove}
								disabled={disabled}
							>
								<X className="h-4 w-4 mr-2" />
								Remove
							</Button>
						</div>
					</div>
				) : (
					<div className="flex w-full flex-col items-center justify-center gap-4 py-8 text-center aspect-video">
						<div className="rounded-full bg-muted p-3">
							<ImagePlus className="h-6 w-6 text-muted-foreground" />
						</div>
						<div className="space-y-1">
							<p className="text-sm font-medium">No image selected</p>
							<p className="text-xs text-muted-foreground">
								Supported formats: JPG, PNG, WEBP
							</p>
						</div>
						<Button
							type="button"
							variant="outline"
							onClick={() => fileInputRef.current?.click()}
							disabled={disabled}
						>
							Upload Image
						</Button>
					</div>
				)}
				<input
					type="file"
					ref={fileInputRef}
					className="hidden"
					accept="image/*"
					onChange={handleFileChange}
					disabled={disabled || isUploading}
				/>
			</div>

			{value && (
				<div className="space-y-2">
					<Label htmlFor="image-alt">Alt text (optional)</Label>
					<Input
						id="image-alt"
						placeholder="Describe the image for screen readers"
						value={alt || ''}
						onChange={handleAltChange}
						disabled={disabled || isUploading}
					/>
				</div>
			)}
		</div>
	);
}
