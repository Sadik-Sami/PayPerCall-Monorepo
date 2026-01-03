'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { ServiceCards } from '@workspace/ui/components/sections';
import { SectionHeader } from '@workspace/ui/components/sections';
import { inboundServices, outboundServices } from '../_data/services';
import { PhoneIncoming, PhoneOutgoing } from 'lucide-react';

export default function ServicesBreakdown() {
	const [activeTab, setActiveTab] = useState('inbound');

	return (
		<section className='py-24 px-6 bg-background border-y border-border'>
			<div className='max-w-6xl mx-auto'>
				<SectionHeader
					badge='Our Services'
					title='Complete Call Center'
					highlight='Solutions'
					subtitle='From customer support to lead generation, we provide end-to-end call center services tailored to your business needs.'
				/>

				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className='w-full'>
					<TabsList className='grid w-full max-w-md mx-auto grid-cols-2 mb-12'>
						<TabsTrigger value='inbound' className='gap-2'>
							<PhoneIncoming className='size-4' />
							Inbound Services
						</TabsTrigger>
						<TabsTrigger value='outbound' className='gap-2'>
							<PhoneOutgoing className='size-4' />
							Outbound Services
						</TabsTrigger>
					</TabsList>

					<TabsContent value='inbound'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}>
							<ServiceCards services={inboundServices} columns={2} />
						</motion.div>
					</TabsContent>

					<TabsContent value='outbound'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}>
							<ServiceCards services={outboundServices} columns={2} />
						</motion.div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
