import { InfiniteSlider } from '@workspace/ui/components/infinite-slider';
import { Building2, Scale, HeartPulse, Home, Shield, Zap } from 'lucide-react';

const INDUSTRIES = [
	{ name: 'Legal Services', icon: Scale },
	{ name: 'Healthcare', icon: HeartPulse },
	{ name: 'Home Services', icon: Home },
	{ name: 'Financial', icon: Building2 },
	{ name: 'Insurance', icon: Shield },
	{ name: 'Energy', icon: Zap },
];

export function IndustryTrustSlider({ className }: { className?: string }) {
	return (
		<div className="w-full bg-background py-10 md:py-16 border-y border-border/50">
			<div className="text-center mb-8">
				<p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
					Trusted by top performers in high-value industries
				</p>
			</div>
			<InfiniteSlider gap={100} speed={40} className={className}>
				{INDUSTRIES.map((industry, i) => (
					<div key={i} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
						<industry.icon className="w-8 h-8 text-primary" />
						<span className="text-lg font-bold text-foreground whitespace-nowrap">{industry.name}</span>
					</div>
				))}
			</InfiniteSlider>
		</div>
	);
}
