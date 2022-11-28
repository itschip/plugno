import React from 'react';
import { classes } from '../../utils/css';

export const View = () => {
	return (
		<div className="bg-neutral-900 h-screen">
			<div className="w-full">
				<div className="mx-auto max-w-2xl lg:max-w-5xl xl:max-w-7xl py-10 px-5 lg:px-0">
					<h1 className="text-white text-4xl font-extrabold">Plugs</h1>
					<div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
						<PlugCard name="Christopher" status="available" />
						<PlugCard name="Real plug" status="unavailable" />
						<PlugCard name="Christopher" status="available" />
						<PlugCard name="Real plug" status="busy" />
						<PlugCard name="Real plug" status="unavailable" />
					</div>
				</div>
			</div>
		</div>
	);
};

type PlugCardProps = {
	name: string;
	status: 'available' | 'unavailable' | 'busy';
};

const StatusColors = {
	available: {
		bg: 'bg-green-800',
		text: 'text-green-300',
	},
	unavailable: {
		bg: 'bg-yellow-800',
		text: 'text-yellow-300',
	},
	busy: {
		bg: 'bg-red-800',
		text: 'text-red-300',
	},
};

const PlugCard: React.FC<PlugCardProps> = ({ name, status }) => {
	return (
		<div className="bg-neutral-800 border border-neutral-700 rounded-md h-52 shadow-sm relative">
			<div className="p-2  flex items-center">
				<span
					className={classes(
						'inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium',
						StatusColors[status].bg,
						StatusColors[status].text,
					)}
				>
					<svg className="-ml-0.5 mr-1.5 h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
						<circle cx={4} cy={4} r={3} />
					</svg>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</span>
			</div>
			<div className="p-2">
				<p className="text-gray-200">
					I am able to help with shipment, moving and all other small tasks. I am usally up til late
					at night.
				</p>
			</div>
			<div className="border-t border-neutral-700 h-[56px] absolute bottom-0 right-0 left-0 flex items-center justify-between p-2">
				<span className="flex items-center space-x-2 group hover:cursor-pointer">
					<img
						className="h-8 w-8 rounded-full"
						src="https://avatars.githubusercontent.com/u/59088889?v=4"
					/>
					<h3 className="text-gray-200 group-hover:text-rose-500 group-hover:underline">{name}</h3>
				</span>
				<div>
					<button className="px-2.5 py-1.5 bg-neutral-700 text-neutral-300 border border-neutral-600 hover:bg-neutral-600 rounded-md">
						Melding
					</button>
				</div>
			</div>
		</div>
	);
};
