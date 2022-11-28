import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { classes } from '../../../utils/css';

type Navigation = {
	name: string;
	link: string;
};

const navigation: Navigation[] = [
	{
		name: 'Plugs',
		link: 'plugs',
	},
	{
		name: 'Jobber',
		link: 'jobber',
	},
];

export const Header = () => {
	const location = useLocation();
	const path = location.pathname.replace('/app/', '');

	const user = useSelector((state: RootState) => state.auth.user);

	return (
		<div className="w-full bg-neutral-900 border-b border-neutral-700">
			<div className="flex h-20 items-center justify-between max-w-7xl mx-auto">
				<div></div>
				<div className="flex space-x-20 items-center">
					<nav className="space-x-4">
						{navigation.map((navigation) => (
							<Link
								key={navigation.link}
								className={classes(
									'font-semibold hover:text-rose-600 text-lg',
									path === navigation.link ? 'text-rose-500' : 'text-gray-400',
								)}
								to={navigation.link}
							>
								{navigation.name}
							</Link>
						))}
					</nav>
					<div className="flex items-center justify-center group hover:cursor-pointer">
						<div className="flex items-center space-x-4">
							<img
								className="h-9 w-9 rounded-full"
								src="https://avatars.githubusercontent.com/u/59088889?v=4"
							/>
							<div>
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
