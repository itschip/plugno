import { classes } from '@utils/css';

type Conversation = {
	id: number;
	/**
	 * JSON string of participants
	 */
	conversationList: string;
	lastMessageId: number;
	createdAt: string;
};

async function getConversations(): Promise<Conversation[]> {
	const res = await fetch('http://localhost:6001/conversations/getAll');

	if (!res.ok) {
		throw new Error('Failed to get conversations');
	}

	return await res.json();
}

export default async function Conversations() {
	const conversations = await getConversations();

	return (
		<div className="w-72 border-r border-gray-400">
			<h2 className="text-black font-bold text-lg">Samtaler</h2>
			<div className="pr-4 mt-2 space-y-4">
				{conversations.map((conversation) => (
					<div key={conversation.id} className={classes('px-3 py-2 rounded-md bg-gray-300')}>
						<p className="text-black">{conversation.conversationList}</p>
						<p className="text-sm text-gray-500">{conversation.id}</p>
					</div>
				))}
			</div>
		</div>
	);
}
