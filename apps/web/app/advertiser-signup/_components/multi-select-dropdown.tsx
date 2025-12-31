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

interface MultiSelectDropdownProps {
	options: string[];
	selectedValues: string[];
	onChange: (values: string[]) => void;
	placeholder?: string;
	disabled?: boolean;
	searchPlaceholder?: string;
}

export function MultiSelectDropdown({
	options,
	selectedValues,
	onChange,
	placeholder = 'Select options',
	disabled = false,
	searchPlaceholder = 'Search...',
}: MultiSelectDropdownProps) {
	const [open, setOpen] = useState(false);

	const handleSelect = useCallback(
		(value: string) => {
			const newValues = selectedValues.includes(value)
				? selectedValues.filter((v) => v !== value)
				: [...selectedValues, value];
			onChange(newValues);
		},
		[selectedValues, onChange]
	);

	const displayText =
		selectedValues.length > 0 ?
			`${selectedValues.length} selected${selectedValues.length === 1 ? '' : 's'}`
		:	placeholder;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				disabled={disabled}
				className={cn(
					'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
				)}>
				<span className={cn('overflow-hidden text-ellipsis', selectedValues.length === 0 && 'text-muted-foreground')}>
					{displayText}
				</span>
				<ChevronDown size={16} />
			</PopoverTrigger>
			<PopoverContent
				collisionPadding={10}
				side='bottom'
				align='start'
				className='min-w-[--radix-popper-anchor-width] p-0'
				style={{ width: 'var(--radix-popper-anchor-width)' }}>
				<Command className='w-full'>
					<CommandList>
						<div className='sticky top-0 z-10 bg-popover'>
							<CommandInput placeholder={searchPlaceholder} />
						</div>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option}
									value={option}
									onSelect={() => handleSelect(option)}
									className='flex items-center w-full gap-2'>
									<div
										className={cn(
											'flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
											selectedValues.includes(option) ?
												'bg-primary text-primary-foreground'
											:	'opacity-50 [&_svg]:invisible'
										)}>
										<CheckIcon className='h-4 w-4' />
									</div>
									<span className='flex-1 overflow-hidden text-ellipsis whitespace-nowrap'>{option}</span>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

