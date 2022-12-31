'use client';

import { RootState } from '@store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classes } from '../../../../utils/css';
import dayjs from 'dayjs';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

type Message = {
	id: string;
	createdAt: string;
	message: string;
	updatedAt: string;
	userId: number;
};

export default function ChatRoomPage() {
	const [message, setMessage] = useState<string>('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const user = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		const _socket = new WebSocket('ws://localhost:6001/ws/3');
		setSocket(_socket);
	}, []);

	useEffect(() => {
		if (socket) {
			socket.onopen = () => {
				console.log('Socket is open');
			};

			socket.onmessage = (msg) => {
				const msgData = JSON.parse(msg.data);
				console.log(msgData);
				setMessages((curVal) => [...curVal, msgData]);
			};

			socket.onclose = () => {
				console.log('Socket is closed');
			};
		}

		return () => {
			socket?.close(1000, 'Closed chat page');
		};
	}, [socket]);

	/*useEffect(() => {
		fetch('http://localhost:6001/messages/GetAll?conversationId=1', {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((data) => {
				setMessages(data);
			});
	}, []);*/

	const handleSendMessage = () => {
		socket?.send(JSON.stringify({ userId: user?.id, message, roomId: '3' }));
		setMessage('');
	};

	return (
		<div className="grow w-full relative">
			<div className="space-y-4 h-[550px] max-h-[550px] lg:h-[600px] lg:max-h-[600px] overflow-scroll overflow-x-hidden">
				{messages.map((msg) => (
					<div key={msg.id}>
						<div
							className={classes(
								'flex items-center justify-start space-x-2',
								msg?.userId == user?.id ? 'justify-end' : 'justify-start',
							)}
						>
							{msg?.userId !== user?.id && (
								<img
									className="h-9 w-9 rounded-full"
									src="https://avatars.githubusercontent.com/u/59088889?v=4"
								/>
							)}
							<div
								className={classes(
									'py-3 px-3 rounded-md w-auto',
									'max-w-[80%] break-words',
									msg?.userId == user?.id
										? 'bg-rose-400 border border-rose-500'
										: 'bg-gray-200 border border-gray-300',
								)}
							>
								<p
									className={classes(
										'text-md',
										msg?.userId == user?.id ? 'text-white' : 'text-black',
									)}
								>
									{msg.message}
								</p>
							</div>
						</div>
						<p
							className={classes(
								'flex text-sm text-gray-500',
								msg?.userId === user?.id ? 'justify-end' : 'justify-start',
							)}
						>
							{dayjs(msg.createdAt).fromNow()}
						</p>
					</div>
				))}
			</div>

			<div className="w-full flex items-center justify-start space-x-4 mt-4">
				<input
					value={message}
					placeholder="Message..."
					onChange={(e) => setMessage(e.currentTarget.value)}
					className="border border-gray-300 bg-gray-200 rounded-md px-2 py-2.5  w-full outline-none"
				/>
				<button onClick={handleSendMessage}>
					<PaperAirplaneIcon className="h-7 w-7 text-gray-500" />
				</button>
			</div>
		</div>
	);
}
