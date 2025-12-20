import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Newspaper, Package, TrendingUp, Activity } from 'lucide-react';

const stats = [
	{
		title: 'Total Users',
		value: '1,234',
		description: '+20.1% from last month',
		icon: Users,
	},
	{
		title: 'Blog Posts',
		value: '56',
		description: '12 published this week',
		icon: FileText,
	},
	{
		title: 'News Articles',
		value: '89',
		description: '8 new articles',
		icon: Newspaper,
	},
	{
		title: 'Packages',
		value: '23',
		description: '5 active promotions',
		icon: Package,
	},
];

export default function DashboardPage() {
	const { user } = useAuth();

	return (
		<div className='space-y-8'>
			{/* Header */}
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
				<p className='text-muted-foreground'>Welcome back, {user?.name}! Here's an overview of your admin panel.</p>
			</div>

			{/* Stats Grid */}
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				{stats.map((stat) => (
					<Card key={stat.title}>
						<CardHeader className='flex flex-row items-center justify-between pb-2'>
							<CardTitle className='text-sm font-medium text-muted-foreground'>{stat.title}</CardTitle>
							<stat.icon className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>{stat.value}</div>
							<p className='text-xs text-muted-foreground'>{stat.description}</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Activity & Quick Stats */}
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
				<Card className='lg:col-span-4'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2'>
							<TrendingUp className='h-5 w-5' />
							Recent Activity
						</CardTitle>
						<CardDescription>Your team's recent actions and updates</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{[
								{ action: 'New user registered', time: '2 minutes ago' },
								{ action: 'Blog post published', time: '1 hour ago' },
								{ action: 'Package updated', time: '3 hours ago' },
								{ action: 'News article created', time: '5 hours ago' },
								{ action: 'Lead converted', time: 'Yesterday' },
							].map((activity, index) => (
								<div key={index} className='flex items-center justify-between border-b pb-3 last:border-0 last:pb-0'>
									<span className='text-sm'>{activity.action}</span>
									<span className='text-xs text-muted-foreground'>{activity.time}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className='lg:col-span-3'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2'>
							<Activity className='h-5 w-5' />
							System Status
						</CardTitle>
						<CardDescription>Current system health overview</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{[
								{ name: 'API Server', status: 'Operational', color: 'bg-green-500' },
								{ name: 'Database', status: 'Operational', color: 'bg-green-500' },
								{ name: 'Storage', status: 'Operational', color: 'bg-green-500' },
								{ name: 'CDN', status: 'Operational', color: 'bg-green-500' },
							].map((item) => (
								<div key={item.name} className='flex items-center justify-between'>
									<span className='text-sm'>{item.name}</span>
									<div className='flex items-center gap-2'>
										<div className={`h-2 w-2 rounded-full ${item.color}`} />
										<span className='text-xs text-muted-foreground'>{item.status}</span>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
