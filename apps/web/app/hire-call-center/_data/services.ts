import { Phone, Headphones, BarChart3, Users, Calendar, ClipboardCheck, Search, MessageSquare, RefreshCw, Database } from 'lucide-react';
import { createElement } from 'react';
import type { ServiceItem } from '@workspace/ui/components/sections/service-cards';

export const inboundServices: ServiceItem[] = [
	{
		title: 'Customer Service & Support',
		description:
			'Deliver exceptional customer experiences with trained agents who represent your brand professionally. Available 24/7/365 to handle inquiries, complaints, and general support.',
		features: [
			'24/7/365 availability',
			'Multi-channel support (phone, email, chat)',
			'Custom scripts and brand training',
			'Quality assurance monitoring',
			'Real-time escalation protocols',
		],
		icon: createElement(Headphones, { className: 'size-5 text-primary' }),
	},
	{
		title: 'Order Processing & Tracking',
		description:
			'Streamline your order management with dedicated agents who process orders, handle modifications, and provide real-time tracking updates to your customers.',
		features: [
			'Order entry and verification',
			'Payment processing support',
			'Shipment tracking assistance',
			'Returns and exchanges handling',
			'Inventory status updates',
		],
		icon: createElement(ClipboardCheck, { className: 'size-5 text-primary' }),
	},
	{
		title: 'Technical Support (Tier 1 & 2)',
		description:
			'Resolve customer technical issues quickly with trained support specialists. We handle troubleshooting, diagnostics, and escalation for complex problems.',
		features: [
			'Tier 1 basic troubleshooting',
			'Tier 2 advanced diagnostics',
			'Remote assistance capabilities',
			'Ticket creation and tracking',
			'Knowledge base documentation',
		],
		icon: createElement(Phone, { className: 'size-5 text-primary' }),
	},
	{
		title: 'After-Hours & Overflow Support',
		description:
			'Never miss a call again. We handle your overflow during peak hours and provide full coverage after business hours, weekends, and holidays.',
		features: [
			'Seamless call forwarding',
			'Peak hour overflow handling',
			'Holiday and weekend coverage',
			'Message taking and dispatch',
			'Emergency escalation protocols',
		],
		icon: createElement(MessageSquare, { className: 'size-5 text-primary' }),
	},
];

export const outboundServices: ServiceItem[] = [
	{
		title: 'Lead Generation & Qualification',
		description:
			'Fill your pipeline with pre-qualified prospects. Our agents identify decision-makers, assess needs, and deliver warm leads ready for your sales team.',
		features: [
			'Targeted prospect identification',
			'Custom qualification criteria',
			'BANT qualification methodology',
			'CRM integration and updates',
			'Lead scoring and prioritization',
		],
		icon: createElement(Users, { className: 'size-5 text-primary' }),
	},
	{
		title: 'Appointment Setting',
		description:
			'Keep your sales calendar full with qualified appointments. We book meetings with decision-makers who match your ideal customer profile.',
		features: [
			'Calendar integration',
			'Confirmation and reminder calls',
			'No-show follow-up',
			'Rescheduling management',
			'Meeting preparation notes',
		],
		icon: createElement(Calendar, { className: 'size-5 text-primary' }),
	},
	{
		title: 'Market Research & Surveys',
		description:
			'Gather valuable market intelligence and customer feedback through professionally conducted surveys and research calls.',
		features: [
			'Customer satisfaction surveys',
			'Market research interviews',
			'Competitive intelligence',
			'Product feedback collection',
			'Data analysis and reporting',
		],
		icon: createElement(Search, { className: 'size-5 text-primary' }),
	},
	{
		title: 'Customer Win-Back Campaigns',
		description:
			'Re-engage lapsed customers and recover lost revenue. Our agents identify pain points and present compelling offers to bring customers back.',
		features: [
			'Lapsed customer outreach',
			'Churn analysis support',
			'Special offer presentation',
			'Objection handling',
			'Win-back success tracking',
		],
		icon: createElement(RefreshCw, { className: 'size-5 text-primary' }),
	},
	{
		title: 'Data Verification & Enrichment',
		description:
			'Maintain accurate customer data with verification calls. We confirm contact information, update records, and enrich your database.',
		features: [
			'Contact information verification',
			'Database cleaning and updates',
			'Decision-maker identification',
			'Company information enrichment',
			'Duplicate record resolution',
		],
		icon: createElement(Database, { className: 'size-5 text-primary' }),
	},
];
