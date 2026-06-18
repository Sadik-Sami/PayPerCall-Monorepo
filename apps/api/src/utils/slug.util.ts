export function slugify(input: string): string {
	const base = input
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-+/g, '-');
	return base.length > 0 ? base : 'blog';
}
