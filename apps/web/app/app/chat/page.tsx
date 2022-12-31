import { redirect } from 'next/navigation';
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

export default async function ChatPage() {
	const conversations = await getConversations();

	const firstConvo = conversations[0].id;
	return redirect(`/app/chat/${firstConvo}`);
}
