import { classes } from '@utils/css';

const conversations = [
	{
		id: 1,
		username: 'Cat person',
		postName: 'Move sofa',
		active: true,
	},
	{
		id: 2,
		username: 'Christopher',
		postName: 'Drive a car to my house',
		active: false,
	},
];

export const Conversations = () => {
	return (
		<div className="w-72 border-r border-neutral-700">
			<h2 className="text-white font-bold text-lg">Samtaler</h2>
			<div className="pr-4 mt-2 space-y-4">
				{conversations.map((conversation) => (
					<div
						key={conversation.id}
						className={classes(
							'px-3 py-2 rounded-md ',
							conversation.active ? 'bg-neutral-800' : '',
						)}
					>
						<p className="text-white">{conversation.username}</p>
						<p className="text-sm text-gray-400">{conversation.postName}</p>
					</div>
				))}
			</div>
		</div>
	);
};
