import type { CaseStudyItem, CaseStudyCardItem, CaseStudyCardAccentColor } from '@/types/services';

const PASTEL_COLORS: CaseStudyCardAccentColor[] = [
  'pastel-peach',
  'pastel-lilac',
  'pastel-lime',
  'pastel-mint',
  'pastel-sky',
  'pastel-blush',
];

export function mapCaseStudyToCard(
  item: CaseStudyItem,
  index: number
): CaseStudyCardItem {
  return {
    title: item.client ?? 'Case Study',
    description: [item.outcome, item.problem].filter(Boolean).join(' '),
    accentColor: PASTEL_COLORS[index % PASTEL_COLORS.length],
    link: item.link,
  };
}
