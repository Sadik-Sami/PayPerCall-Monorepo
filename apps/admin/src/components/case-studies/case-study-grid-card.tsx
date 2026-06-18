import { MoreVertical, Edit2, Trash2, ChevronUp, ChevronDown, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
	DropdownMenuPortal,
} from '@workspace/ui/components/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import type { CaseStudy, CaseStudyStatus } from '@/types/case-study.types';
import { CaseStudyStatusBadge } from './case-study-status-badge';

interface CaseStudyGridCardProps {
	caseStudy: CaseStudy;
	canMoveUp: boolean;
	canMoveDown: boolean;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	onStatusChange: (id: string, status: CaseStudyStatus) => void;
	onMoveUp: (id: string) => void;
	onMoveDown: (id: string) => void;
	isReorderDisabled?: boolean;
	orderNumber?: number;
}

const categoryLabels: Record<string, string> = {
	'pay-per-call': 'Pay Per Call',
	'pay-per-lead': 'Pay Per Lead',
	'digital-marketing': 'Digital Marketing',
	'app-dev': 'App Dev',
	'cms': 'CMS',
	'web-dev': 'Web Dev',
	'hire-call-center': 'Hire Call Center',
};

const accentColors: Record<string, string> = {
	'pastel-peach': 'bg-orange-100',
	'pastel-lilac': 'bg-purple-100',
	'pastel-lime': 'bg-lime-100',
	'pastel-mint': 'bg-emerald-100',
	'pastel-sky': 'bg-sky-100',
	'pastel-blush': 'bg-pink-100',
};

export function CaseStudyGridCard({
	caseStudy,
	canMoveUp,
	canMoveDown,
	onEdit,
	onDelete,
	onStatusChange,
	onMoveUp,
	onMoveDown,
	isReorderDisabled = false,
	orderNumber,
}: CaseStudyGridCardProps) {
	const fallbackColor = caseStudy.accent_color ? accentColors[caseStudy.accent_color] : 'bg-muted';

	return (
		<Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
			{/* Image Cover */}
			<div className={`relative aspect-video w-full ${fallbackColor}`}>
				{caseStudy.image_url ? (
					<img
						src={caseStudy.image_url}
						alt={caseStudy.image_alt || caseStudy.title}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="flex items-center justify-center w-full h-full">
						<span className="text-muted-foreground font-medium opacity-50">No Cover Image</span>
					</div>
				)}

				{/* Top Left: Status */}
				<div className="absolute top-2 left-2">
					<CaseStudyStatusBadge status={caseStudy.status} />
				</div>

				{/* Top Right: Category Pill */}
				<div className="absolute top-2 right-2">
					<Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
						{categoryLabels[caseStudy.category] || caseStudy.category}
					</Badge>
				</div>
			</div>

			<CardHeader className="p-4 pb-2">
				<CardTitle className="line-clamp-1" title={caseStudy.title}>
					{caseStudy.title}
				</CardTitle>
			</CardHeader>
			
			<CardContent className="p-4 pt-0 flex-1">
				<CardDescription className="line-clamp-2" title={caseStudy.description}>
					{caseStudy.description}
				</CardDescription>
			</CardContent>

			<CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
				{/* Left: Order badge + Reorder Controls (hidden when reorder disabled) */}
				{!isReorderDisabled && (
					<div className="flex items-center gap-2">
						{orderNumber !== undefined && (
							<Badge variant="secondary" className="font-mono">
								#{orderNumber}
							</Badge>
						)}
						<div className="flex items-center gap-1">
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={() => onMoveUp(caseStudy.id)}
								disabled={!canMoveUp}
								title="Move up"
							>
								<ChevronUp className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={() => onMoveDown(caseStudy.id)}
								disabled={!canMoveDown}
								title="Move down"
							>
								<ChevronDown className="h-4 w-4" />
							</Button>
						</div>
					</div>
				)}

				{/* Right: Actions Menu */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="h-8 w-8">
							<MoreVertical className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => onEdit(caseStudy.id)}>
							<Edit2 className="mr-2 h-4 w-4" />
							Edit
						</DropdownMenuItem>
						
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<CheckCircle className="mr-2 h-4 w-4" />
								Status
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem onClick={() => onStatusChange(caseStudy.id, 'draft')}>
										<Clock className="mr-2 h-4 w-4 text-muted-foreground" />
										Draft
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => onStatusChange(caseStudy.id, 'published')}>
										<CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
										Published
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => onStatusChange(caseStudy.id, 'archived')}>
										<Trash2 className="mr-2 h-4 w-4 text-muted-foreground" />
										Archived
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>

						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => onDelete(caseStudy.id)} className="text-destructive focus:text-destructive">
							<Trash2 className="mr-2 h-4 w-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardFooter>
		</Card>
	);
}
