import {
	ServiceCapabilitiesGateway,
	TrustBanner,
} from '@/components/services';
import {
	PAY_PER_LEAD_SERVICE_NAV,
	PAY_PER_LEAD_GATEWAY_CONFIG,
	buildGatewayCards,
} from '@/components/services/nav-items';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Pay Per Lead Services | Exclusive, Shared & Real-Time Leads | PayPerCall',
	description:
		'Expert pay-per-lead services: exclusive leads, shared leads, and real-time lead delivery for measurable marketing ROI. Free consultation.',
	alternates: { canonical: '/services/pay-per-lead' },
	robots: { index: true, follow: true },
};

export default function PayPerLeadPage() {
	return (
		<main className='space-y-12'>
			<TrustBanner />
			<ServiceCapabilitiesGateway
				title={PAY_PER_LEAD_GATEWAY_CONFIG.title}
				subtitle={PAY_PER_LEAD_GATEWAY_CONFIG.subtitle}
				cards={buildGatewayCards(
					PAY_PER_LEAD_SERVICE_NAV,
					'/services/pay-per-lead',
					PAY_PER_LEAD_GATEWAY_CONFIG.ctaLabels,
					PAY_PER_LEAD_GATEWAY_CONFIG.iconKeys
				)}
				primaryCta={PAY_PER_LEAD_GATEWAY_CONFIG.primaryCta}
				primaryCtaNote={PAY_PER_LEAD_GATEWAY_CONFIG.primaryCtaNote}
				columns={PAY_PER_LEAD_GATEWAY_CONFIG.columns}
				className='max-w-7xl mx-auto'
			/>
		</main>
	);
}
