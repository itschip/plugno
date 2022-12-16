'use client';

import { classes } from '@utils/css';
import { useEffect, useState } from 'react';

const conversations = [
	{
		id: 1,
		username: 'Andrine',
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

export default function ChatPage() {
	const [message, setMessage] = useState<string>('');
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		const _socket = new WebSocket('ws://localhost:6001/ws');
		setSocket(_socket);
	}, []);

	useEffect(() => {
		if (socket) {
			socket.onopen = () => {
				console.log('Socket is open');
			};

			socket.onmessage = (msg) => {
				console.log('new data:', msg.data);
				setMessages((curVal) => [...curVal, msg.data]);
			};
		}
	}, [socket]);

	const handleSendMessage = () => {
		socket?.send(message);
	};

	return (
		<div className="h-full bg-neutral-900">
			<div className="mx-auto xl:max-w-7xl py-10 px-3 xl:px-0">
				<div className="flex justify-start space-x-10 relative">
					<div className="w-56 border-r border-neutral-700">
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
					<div className="grow h-[600px] relative">
						<div className="flex flex-col space-y-4">
							{messages.map((msg) => (
								<div className="flex items-stretch justify-start">
									<div className="bg-neutral-800 py-3 px-3 rounded-md w-auto float-right min-w-[10%] max-w-[30%] break-words">
										<p className="text-white text-md">{msg}</p>
									</div>
								</div>
							))}
						</div>
						<div className="absolute bottom-0 w-full flex items-center justify-start space-x-4">
							<input
								value={message}
								placeholder="Message..."
								onChange={(e) => setMessage(e.currentTarget.value)}
								className="border border-neutral-700 bg-neutral-800 rounded-md px-2 py-2.5 text-white w-full outline-none"
							/>
							<button
								onClick={handleSendMessage}
								className="bg-rose-500 text-white px-6 py-2 rounded-md text-lg bg-rose-500/60 border border-rose-600/60 hover:bg-rose-600/60"
							>
								Send
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
