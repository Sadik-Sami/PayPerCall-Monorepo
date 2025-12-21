export interface NavLink {
	label: string;
	href: string;
	description?: string;
}

export interface NavColumn {
	title: string;
	links: NavLink[];
}

export interface NavItem {
	id: string;
	label: string;
	columns?: NavColumn[];
	href?: string;
}
