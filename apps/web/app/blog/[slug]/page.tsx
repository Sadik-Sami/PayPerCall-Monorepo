import { redirect } from 'next/navigation';

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function LegacyBlogRedirect({ params }: Props) {
	const { slug } = await params;
	redirect(`/blogs/${slug}`);
}

