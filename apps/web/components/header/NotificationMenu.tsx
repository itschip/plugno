'use client';

import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
	BellIcon,
	BoltIcon,
	ChatBubbleLeftIcon as ChatIconOutline,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const notifications = [
	{
		id: 1,
		topic: 'Message',
		message: 'New message from Plug',
		icon: ChatIconOutline,
	},
	{
		id: 2,
		topic: 'Offer',
		message: 'A new offer has been made',
		icon: BoltIcon,
	},
];

export const NotificationMenu = () => {
	return (
		<Popover className="relative">
			{({ open }) => (
				<>
					<Popover.Button className="relative inline-block mt-1.5 outline-none">
						<BellIcon className="h-7 w-7 text-gray-400 hover:text-gray-200 cursor-pointer" />
						<span className="absolute top-0 right-1 block h-1.5 w-1.5 rounded-full bg-rose-300 ring-2 ring-rose-400" />
					</Popover.Button>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-sm">
							<div className="overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
								<div className="relative p-7 flex flex-col bg-neutral-700 border border-neutral-600 space-y-5">
									{notifications.map((item) => (
										<Link
											key={item.id}
											href="somewhere"
											className="-m-3 flex items-center space-x-4 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-600"
										>
											<span>
												<item.icon className="h-6 w-6 text-gray-300" />
											</span>
											<div className="ml-2">
												<p className="text-sm font-medium text-gray-200">{item.topic}</p>
												<p className="text-sm text-gray-400">{item.message}</p>
											</div>
										</Link>
									))}
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};
