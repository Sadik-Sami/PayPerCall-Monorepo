import { HeroSection } from "@/components/blocks/hero-1";
import { InfiniteSlider } from "@workspace/ui/components/infinite-slider";
import appleIcon from '@/public/icons/apple.svg'
import googleIcon from '@/public/icons/google.svg'
import facebookIcon from '@/public/icons/facebook.svg'
import twitterIcon from '@/public/icons/twitter.svg'
import slackIcon from '@/public/icons/slack.svg'
import whatsappIcon from '@/public/icons/whatsapp.svg'
import Image from "next/image";
import { ServiceCapabilitiesGateway } from '@/components/services';
import {
	PAY_PER_CALL_SERVICE_NAV,
	PAY_PER_CALL_GATEWAY_CONFIG,
	buildGatewayCards,
} from '@/components/services/nav-items';

export default function PayPerCallPage() {
	return (
		<main className='space-y-12'>
			<HeroSection
        title="Pay Per Call"
        subtitle="Pay Per Call is a marketing service that allows you to pay for each call you receive. It is a great way to get more leads and sales."
        callToAction={{
          text: "Get a Free Consultation",
          href: "/contact",
        }}
        backgroundImage="https://plus.unsplash.com/premium_photo-1687362298502-1881385c786f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        contactInfo={{
          website: "https://corecloser.com",
          phone: "+1 (855) 330-2777",
          address: "20555 US-19 N, Clearwater, FL 33763",
        }}
      />
			<InfiniteSlider gap={128} speed={50} className='max-w-7xl mx-auto py-12'>
				<Image src={appleIcon} className='h-12 w-auto' alt="apple" width={48} height={48} />
				<Image src={googleIcon} className='h-12 w-auto' alt="google" width={48} height={48} />
				<Image src={facebookIcon} className='h-12 w-auto' alt="facebook" width={48} height={48} />
				<Image src={twitterIcon} className='h-12 w-auto' alt="twitter" width={48} height={48} />
				<Image src={slackIcon} className='h-12 w-auto' alt="slack" width={48} height={48} />
				<Image src={whatsappIcon} className='h-12 w-auto' alt="whatsapp" width={48} height={48} />
			</InfiniteSlider>
			<ServiceCapabilitiesGateway
				title={PAY_PER_CALL_GATEWAY_CONFIG.title}
				subtitle={PAY_PER_CALL_GATEWAY_CONFIG.subtitle}
				cards={buildGatewayCards(
					PAY_PER_CALL_SERVICE_NAV,
					'/services/pay-per-call',
					PAY_PER_CALL_GATEWAY_CONFIG.ctaLabels,
					PAY_PER_CALL_GATEWAY_CONFIG.iconKeys
				)}
				primaryCta={PAY_PER_CALL_GATEWAY_CONFIG.primaryCta}
				primaryCtaNote={PAY_PER_CALL_GATEWAY_CONFIG.primaryCtaNote}
				columns={PAY_PER_CALL_GATEWAY_CONFIG.columns}
				className='max-w-7xl mx-auto'
			/>
		</main>
	);
}