import { Link, useLocation } from 'react-router';
import { LayoutDashboard, FileText, Users, MessageSquare, User, LogOut, Shield, ChevronUp, BookOpenCheck } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { useAuth } from '@/hooks/use-auth';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from '@/components/ui/sidebar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navigationItems = [
	{
		title: 'Dashboard',
		href: ROUTES.DASHBOARD,
		icon: LayoutDashboard,
	},
	{
		title: 'Blogs',
		href: ROUTES.DASHBOARD_BLOGS,
		icon: FileText,
	},
	{
		title: 'Leads',
		href: ROUTES.DASHBOARD_LEADS,
		icon: Users,
	},
	{
		title: 'Contact Submissions',
		href: ROUTES.DASHBOARD_CONTACT_SUBMISSIONS,
		icon: MessageSquare,
	},
	{
		title: 'Case Studies',
		href: ROUTES.DASHBOARD_CASE_STUDIES,
		icon: BookOpenCheck,
	},
];

export default function AppSidebar() {
	const location = useLocation();
	const { user, logout, isLoading } = useAuth();

	const isActiveHref = (href: string) => {
		if (location.pathname === href) return true;
		// return location.pathname.startsWith(`${href}/`);
	};

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<Sidebar collapsible='icon'>
			{/* Header */}
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size='lg'>
							<Link className='flex flex-row items-center gap-2' to={ROUTES.DASHBOARD}>
								<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-primary-foreground'>
									<Shield className='size-4 text-primary-foreground' />
								</div>
								<div className='flex flex-col'>
									<span className='truncate font-semibold'>Core Closer</span>
									<span className='text-xs text-muted-foreground'>Admin Panel</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			{/* Navigation */}
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navigationItems.map((item) => {
								const isActive = isActiveHref(item.href);
								return (
									<Link to={item.href}>
										<SidebarMenuItem key={item.href}>
											<SidebarMenuButton variant='outline' isActive={isActive} tooltip={item.title}>
												<item.icon className='size-4' />
												<span>{item.title}</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									</Link>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarSeparator />

			{/* Footer with User Menu */}
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size='lg'
									className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
									<Avatar className='h-8 w-8 rounded-lg'>
										<AvatarImage src={user?.image?.url} alt={user?.name} />
										<AvatarFallback className='rounded-lg bg-primary text-primary-foreground text-xs'>
											{user?.name ? getInitials(user.name) : 'AD'}
										</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-semibold'>{user?.name}</span>
										<span className='truncate text-xs text-muted-foreground'>{user?.email}</span>
									</div>
									<ChevronUp className='ml-auto size-4' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
								side='top'
								align='end'
								sideOffset={4}>
								<DropdownMenuItem asChild>
									<Link to={ROUTES.PROFILE} className='flex items-center gap-2 cursor-pointer'>
										<User className='size-4' />
										<span>Profile</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									className='flex items-center gap-2 cursor-pointer'
									onClick={() => logout()}
									disabled={isLoading}>
									<LogOut className='size-4' />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
