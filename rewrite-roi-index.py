import re

with open("apps/web/components/sections/services/shared/roi-calculator/ROICalculatorSection.original.tsx", "r") as f:
    content = f.read()

# Extract the imports (just take all imports at the top up to the first function/type)
imports_match = re.match(r"^(.*?)(?=type ChartMode)", content, re.DOTALL)
imports = imports_match.group(1) if imports_match else ""

# Remove types, constants, logic from imports
# Actually, let's just write the imports manually to be safe
imports_code = """'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useSpring } from 'framer-motion';
import { Activity, ArrowRight, BadgeDollarSign, Calculator, RefreshCcw, Sparkles, TrendingUp, Mail } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { toast } from 'sonner';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Slider } from '@workspace/ui/components/slider';
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
} from '@workspace/ui/components/chart';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants, cardVariants } from '@/lib/animations';

import { 
    type ChartMode, 
    type InputKey, 
    type RoiInputs 
} from './types';
import { 
    DEFAULT_INPUTS, 
    MARKETING_DEFAULT_INPUTS, 
    INPUT_BOUNDS, 
    CALL_METRIC_FIELDS, 
    LEAD_METRIC_FIELDS, 
    MARKETING_METRIC_FIELDS, 
    CHART_CONFIG_CALL, 
    CHART_CONFIG_LEAD, 
    CHART_CONFIG_MARKETING 
} from './constants';
import { compactCurrency, preciseCurrency, integerNumber, clamp } from './utils';
import { calculateDefaultRoiMetrics, calculateMarketingRoiMetrics } from './logic';
import { RoiDualTooltip } from './RoiDualTooltip';

export type ROICalculatorSectionProps = {
	className?: string;
	mode?: 'call' | 'lead' | 'marketing';
};
"""

# Extract the ROICalculatorSection function
func_match = re.search(r"(export function ROICalculatorSection.*)", content, re.DOTALL)
func_code = func_match.group(1) if func_match else ""

# Modify the button
old_button = """<Button
							type='button'
							size='lg'
							className='mt-1 h-11 w-full rounded-xl text-sm font-bold transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg'>
							<BadgeDollarSign className='size-4' aria-hidden='true' />
							Get My Custom Scaling Plan
						</Button>"""

new_button = """<div className="flex flex-col gap-2 mt-1">
						<Button
							type='button'
							size='lg'
                            asChild
							className='h-11 w-full rounded-xl text-sm font-bold transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg'>
                            <a href={`/contact?leadCost=${inputs.leadCost}&capacity=${inputs.callCapacity}&dealValue=${inputs.dealValue}&roi=${metrics.projectedMonthlyProfit}`}>
							    <BadgeDollarSign className='size-4' aria-hidden='true' />
							    Get My Custom Scaling Plan
                            </a>
						</Button>
                        <Button
                            type="button"
                            size="lg"
                            variant="outline"
                            asChild
                            className="h-11 w-full rounded-xl text-sm font-bold transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg border-pastel-lilac-border text-pastel-lilac-ink"
                        >
                            <a href={`/contact?leadCost=${inputs.leadCost}&capacity=${inputs.callCapacity}&dealValue=${inputs.dealValue}&roi=${metrics.projectedMonthlyProfit}&requestReport=true`}>
                                <Mail className='size-4 mr-2' aria-hidden='true' />
                                Email Me This ROI Report
                            </a>
                        </Button>
                        </div>"""

func_code = func_code.replace(old_button, new_button)

# Also fix the type of onChartHover, since we removed it from types
# Find: const onChartHover = (state: AreaChartMouseState) => {
# Replace: const onChartHover = (state: any) => {
func_code = re.sub(r"onChartHover = \(state: AreaChartMouseState\)", "onChartHover = (state: any)", func_code)

final_code = imports_code + "\n" + func_code

with open("apps/web/components/sections/services/shared/roi-calculator/index.tsx", "w") as f:
    f.write(final_code)

# Replace the original exported file to just re-export
with open("apps/web/components/sections/services/shared/ROICalculatorSection.tsx", "w") as f:
    f.write("export { ROICalculatorSection } from './roi-calculator';\n")
    f.write("export type { ROICalculatorSectionProps } from './roi-calculator';\n")
