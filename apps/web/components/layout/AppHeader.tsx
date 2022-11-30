'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ChatBubbleLeftIcon as ChatIconOutline } from '@heroicons/react/24/outline';
import { NotificationMenu } from '../header/NotificationMenu';
import { RootState } from '../../store/store';
import { classes } from '../../utils/css';
import { usePathname } from 'next/navigation';

type Navigation = {
	name: string;
	link: string;
};

const navigation: Navigation[] = [
	{
		name: 'Plugs',
		link: '/app/plugs',
	},
	{
		name: 'Jobber',
		link: '/app/jobs',
	},
];

export const Header = () => {
	const path = usePathname();

	const user = useSelector((state: RootState) => state.auth.user);

	return (
		<div className="w-full bg-neutral-900 border-b border-neutral-700">
			<div className="flex h-20 items-center justify-between sm:max-w-5xl lg:max-w-7xl mx-auto px-3 xl:space-x-0">
				<div className="hidden lg:block">
					<nav className="space-x-4">
						{navigation.map((navigation) => (
							<Link
								key={navigation.link}
								className={classes(
									'font-semibold hover:text-rose-500 text-lg hover:underline',
									path?.includes(navigation.link) ? 'text-rose-500 ' : 'text-gray-400',
								)}
								href={navigation.link}
							>
								{navigation.name}
							</Link>
						))}
					</nav>
				</div>
				<div className="w-full sm:max-w-xl lg:max-w-2xl xl:max-w-[60%] xl:mx-auto hidden sm:block">
					<input
						placeholder="Søk etter hjelp, plugs og alt annet..."
						className="text-white px-2 py-3 text-md bg-neutral-800 border border-neutral-700 outline-none rounded-md w-full"
					/>
				</div>
				<div className="flex space-x-5 xl:space-x-8 items-center">
					<div className="items-center space-x-4 hidden md:flex">
						<Link href="chat" className="relative inline-block">
							{path === 'chat' ? (
								<ChatIconOutline className="h-7 w-7 text-rose-600 fill-rose-500 cursor-pointer" />
							) : (
								<ChatIconOutline className="h-7 w-7 text-gray-400 hover:text-gray-200 cursor-pointer" />
							)}
							<span className="absolute top-0 right-0 block h-1.5 w-1.5 rounded-full bg-rose-300 ring-2 ring-rose-400" />
						</Link>
						<NotificationMenu />
					</div>
					<div className="flex items-center justify-center group hover:cursor-pointer">
						<div className="flex items-center space-x-4">
							<img
								className="h-9 w-9 rounded-full"
								src="https://avatars.githubusercontent.com/u/59088889?v=4"
							/>
							<div className="hidden md:block">
								<p className="text-gray-200 text-md group-hover:text-gray-400">{user?.username}</p>
								<p className="text-sm text-gray-400 group-hover:text-rose-500 group-hover:underline">
									Vis profil
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
