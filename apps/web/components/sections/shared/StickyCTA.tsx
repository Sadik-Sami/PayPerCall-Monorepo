'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@workspace/ui/components/button';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface StickyCTAProps {
	title?: string;
	ctaText?: string;
	href?: string;
}

export function StickyCTA({ 
	title = "Ready to scale your pipeline?", 
	ctaText = "Get Lead Pricing", 
	href = "/contact" 
}: StickyCTAProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 600) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
				>
					<div className="max-w-4xl mx-auto bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
						<div className="flex items-center gap-3">
							<div className="bg-primary/10 p-2 rounded-full">
								<PhoneCall className="w-5 h-5 text-primary" />
							</div>
							<p className="font-semibold text-foreground">{title}</p>
						</div>
						<Button asChild size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg group">
							<a href={href}>
								{ctaText}
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</a>
						</Button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
