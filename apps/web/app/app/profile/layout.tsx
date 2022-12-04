'use client';

import { Cog6ToothIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import { classes } from '@utils/css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navigation = [
	{ name: 'Generelt', href: '/app/profile/general', icon: HomeIcon },
	{ name: 'Instillinger', href: '#', icon: Cog6ToothIcon },
	{ name: 'Konto', href: '/app/profile/account', icon: UserIcon },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="h-screen bg-neutral-900">
			<div className="mx-auto xl:max-w-7xl py-10 px-3 xl:px-0">
				<div className="flex justify-start space-x-12">
					<nav className="w-[15%] space-y-2">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={classes(
									item.href === pathname
										? 'bg-neutral-800 text-white'
										: 'text-gray-300 hover:bg-neutral-700 hover:text-white',
									'group flex items-center px-4 py-3 text-sm font-medium rounded-md',
								)}
							>
								<item.icon
									className={classes(
										item.href === pathname
											? 'text-gray-300'
											: 'text-gray-400 group-hover:text-gray-300',
										'mr-3 flex-shrink-0 h-5 w-5',
									)}
									aria-hidden="true"
								/>
								{item.name}
							</Link>
						))}
					</nav>
					<div className="flex-grow flex-1">{children}</div>
				</div>
			</div>
		</div>
	);
}
