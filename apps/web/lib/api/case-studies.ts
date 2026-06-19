import 'server-only';
import { cache } from 'react';
import type { CaseStudyCardItem } from '@/types/services';

type Category = 'pay-per-call' | 'pay-per-lead' | 'digital-marketing' | 'app-dev' | 'cms' | 'web-dev' | 'hire-call-center';

interface ApiCaseStudy {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  image_alt: string | null;
  accent_color: CaseStudyCardItem['accentColor'] | null;
  link: string | null;
}

interface PublicListResponse {
  success: boolean;
  data?: ApiCaseStudy[];
  message?: string;
}

export const getCaseStudiesByCategory = cache(
  async (category: Category, limit = 12): Promise<CaseStudyCardItem[]> => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) return [];

    const url = `${base}/api/case-studies?category=${encodeURIComponent(category)}&limit=${limit}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];

    const body = (await res.json()) as PublicListResponse;
    if (!body.success || !body.data) return [];

    return body.data.map(toCard);
  },
);

function toCard(record: ApiCaseStudy): CaseStudyCardItem {
  return {
    title: record.title,
    description: record.description,
    image: record.image_url ? { src: record.image_url, alt: record.image_alt ?? record.title } : undefined,
    accentColor: record.accent_color ?? undefined,
    link: record.link ?? undefined,
  };
}
