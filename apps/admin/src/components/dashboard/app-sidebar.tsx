import { Link, useLocation } from 'react-router';
import { LayoutDashboard, FileText, Newspaper, Package, Users, User, LogOut, Shield, ChevronUp } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
		title: 'News',
		href: ROUTES.DASHBOARD_NEWS,
		icon: Newspaper,
	},
	{
		title: 'Packages',
		href: ROUTES.DASHBOARD_PACKAGES,
		icon: Package,
	},
	{
		title: 'Leads',
		href: ROUTES.DASHBOARD_LEADS,
		icon: Users,
	},
];

export default function AppSidebar() {
	const location = useLocation();
	const { user, logout, isLoading } = useAuth();

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
						<SidebarMenuButton size='lg' asChild>
							<Link to={ROUTES.DASHBOARD}>
								<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
									<Shield className='size-4' />
								</div>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>Admin Panel</span>
									<span className='truncate text-xs text-muted-foreground'>Dashboard</span>
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
								const isActive = location.pathname === item.href;
								return (
									<SidebarMenuItem key={item.href}>
										<SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
											<Link to={item.href}>
												<item.icon className='size-4' />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
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
