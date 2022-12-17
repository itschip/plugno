'use client';

import { Conversations } from '@components/chat/Conversations';
import { RootState } from '@store/store';
import { classes } from '@utils/css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ChatPage() {
	const [message, setMessage] = useState<string>('');
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [messages, setMessages] = useState<string[]>([]);
	const user = useSelector((state: RootState) => state.auth.user);

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
				console.log('new data:', msg);
				const msgData = JSON.parse(msg.data);
				setMessages((curVal) => [...curVal, msgData.message]);
			};

			socket.onclose = () => {
				console.log('Socket is closed');
			};
		}

		return () => {
			socket?.close();
		};
	}, [socket]);

	const handleSendMessage = () => {
		socket?.send(JSON.stringify({ userId: user?.id, message }));
	};

	return (
		<div className="bg-neutral-900">
			<div className="mx-auto xl:max-w-7xl py-10 px-3 xl:px-0">
				<div className="flex justify-start space-x-10">
					<Conversations />
					<div className="grow w-full relative">
						<div className="space-y-4 h-[600px] max-h-[600px] overflow-scroll overflow-x-hidden ">
							{messages.map((msg) => (
								<div className="flex items-stretch justify-start">
									<div className="bg-neutral-800 py-3 px-3 rounded-md w-auto float-right min-w-[10%] max-w-[30%] break-words">
										<p className="text-white text-md">{msg}</p>
									</div>
								</div>
							))}
						</div>
						<div className="w-full flex items-center justify-start space-x-4 mt-4">
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
