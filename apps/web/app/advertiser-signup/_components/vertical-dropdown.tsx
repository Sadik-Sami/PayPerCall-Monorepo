'use client';

import React, { useState, useCallback } from 'react';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@workspace/ui/components/command';
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/popover';
import { CheckIcon, ChevronDown } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

// Vertical options structure
export interface VerticalOption {
	value: string;
	label: string;
	category: string;
}

interface VerticalDropdownProps {
	options: VerticalOption[];
	selectedValue?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
}

// Market niche to verticals mapping
export const VERTICAL_OPTIONS: Record<string, VerticalOption[]> = {
	'Binary/bizopp': [
		{ value: 'binary-options', label: 'Binary options', category: 'Binary/bizopp' },
		{ value: 'business-opportunity', label: 'Business Opportunity', category: 'Binary/bizopp' },
	],
	'Mobile content': [
		{ value: 'mobile-content', label: 'mobile content', category: 'Mobile content' },
		{ value: 'mobile-content-carrier-billing', label: 'mobile content, Carrier Billing', category: 'Mobile content' },
		{ value: 'push-subscriptions', label: 'Push Subscriptions', category: 'Mobile content' },
	],
	Education: [{ value: 'education', label: 'Education', category: 'Education' }],
	Download: [{ value: 'download', label: 'Download', category: 'Download' }],
	Financial: [{ value: 'financial', label: 'Financial', category: 'Financial' }],
	Other: [{ value: 'other', label: 'Other', category: 'Other' }],
	'Mobile apps': [{ value: 'mobile-apps', label: 'Mobile apps', category: 'Mobile apps' }],
	'Social Networking': [{ value: 'social-networking', label: 'Social Networking', category: 'Social Networking' }],
	Ecommerce: [{ value: 'ecommerce', label: 'Ecommerce', category: 'Ecommerce' }],
	Travel: [{ value: 'travel', label: 'Travel', category: 'Travel' }],
	Gaming: [{ value: 'gaming', label: 'Gaming', category: 'Gaming' }],
	iGaming: [{ value: 'igaming', label: 'iGaming', category: 'iGaming' }],
	Smartlink: [{ value: 'smartlink', label: 'Smartlink', category: 'Smartlink' }],
	'Vouchers/Leadgen': [{ value: 'vouchers-leadgen', label: 'Vouchers/Leadgen', category: 'Vouchers/Leadgen' }],
	Nutra: [{ value: 'nutra', label: 'Nutra', category: 'Nutra' }],
	'Financial-': [{ value: 'financial-', label: 'Financial-', category: 'Financial-' }],
	Forex: [{ value: 'forex', label: 'Forex', category: 'Forex' }],
	Health: [{ value: 'health', label: 'Health', category: 'Health' }],
	Legal: [{ value: 'legal', label: 'Legal', category: 'Legal' }],
	Survey: [{ value: 'survey', label: 'Survey', category: 'Survey' }],
	'WH Leadgen': [{ value: 'wh-leadgen', label: 'WH Leadgen', category: 'WH Leadgen' }],
	'Pay-Per-Call': [{ value: 'pay-per-call', label: 'Pay-Per-Call', category: 'Pay-Per-Call' }],
	Insurance: [{ value: 'insurance', label: 'Insurance', category: 'Insurance' }],
	'Home improvement': [{ value: 'home-improvement', label: 'Home improvement', category: 'Home improvement' }],
};

export function getVerticalsForNiches(selectedNiches: string[]): VerticalOption[] {
	const allVerticals: VerticalOption[] = [];
	const categorySet = new Set<string>();

	selectedNiches.forEach((niche) => {
		const verticals = VERTICAL_OPTIONS[niche] || [];
		verticals.forEach((vertical) => {
			if (!categorySet.has(vertical.category)) {
				categorySet.add(vertical.category);
			}
			allVerticals.push(vertical);
		});
	});

	// Group by category
	const grouped: Record<string, VerticalOption[]> = {};
	allVerticals.forEach((vertical) => {
		if (!grouped[vertical.category]) {
			grouped[vertical.category] = [];
		}
		grouped[vertical.category]?.push(vertical);
	});

	// Flatten with category order preserved
	const result: VerticalOption[] = [];
	const categories = Array.from(categorySet);
	categories.forEach((category) => {
		if (grouped[category]) {
			result.push(...grouped[category]);
		}
	});

	return result;
}

export function VerticalDropdown({
	options,
	selectedValue,
	onChange,
	placeholder = 'Select an option',
	disabled = false,
}: VerticalDropdownProps) {
	const [open, setOpen] = useState(false);

	const handleSelect = useCallback(
		(value: string) => {
			onChange?.(value);
			setOpen(false);
		},
		[onChange]
	);

	// Group options by category
	const groupedOptions: Record<string, VerticalOption[]> = {};
	options.forEach((option) => {
		if (!groupedOptions[option.category]) {
			groupedOptions[option.category] = [];
		}
		groupedOptions[option.category]?.push(option);
	});

	const selectedOption = options.find((opt) => opt.value === selectedValue);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				disabled={disabled}
				className={cn(
					'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
				)}>
				<span className={cn('overflow-hidden text-ellipsis', !selectedOption && 'text-muted-foreground')}>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<ChevronDown size={16} />
			</PopoverTrigger>
			<PopoverContent
				collisionPadding={10}
				side='bottom'
				align='start'
				className='min-w-[--radix-popper-anchor-width] p-0'
				style={{ width: 'var(--radix-popper-anchor-width)' }}>
				<Command className='w-full max-h-[300px]'>
					<CommandList>
						<div className='sticky top-0 z-10 bg-popover'>
							<CommandInput placeholder='Search vertical...' />
						</div>
						<CommandEmpty>No vertical found.</CommandEmpty>
						{Object.entries(groupedOptions).map(([category, categoryOptions]) => (
							<CommandGroup key={category} heading={category}>
								{categoryOptions.map((option) => (
									<CommandItem
										key={option.value}
										value={`${option.value} ${option.label} ${option.category}`}
										onSelect={() => handleSelect(option.value)}
										className='flex items-center w-full gap-2'>
										<span className='flex-1 overflow-hidden text-ellipsis whitespace-nowrap'>{option.label}</span>
										<CheckIcon
											className={cn(
												'ml-auto h-4 w-4 shrink-0',
												selectedValue === option.value ? 'opacity-100' : 'opacity-0'
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

