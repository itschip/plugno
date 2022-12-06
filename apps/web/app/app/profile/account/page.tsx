'use client';

import { RootState } from '@store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@plugs/ui';

export default function ProfileAccountPage() {
	const user = useSelector((state: RootState) => state.auth.user);
	const [username, setUsername] = useState(user?.username);

	return (
		<div>
			<h1 className="text-white font-extrabold text-3xl">Konto</h1>
			<div className="mt-8 max-w-lg space-y-4">
				<Input />
				<input
					value={username}
					onChange={(e) => setUsername(e.currentTarget.value)}
					className="bg-neutral-800 border border-neutral-700 w-full rounded-md py-2 px-3 outline-none text-white"
				/>
				<div className="bg-neutral-800 border border-neutral-700 w-full rounded-md py-2 px-3 outline-none text-white">
					{user?.email}
				</div>
			</div>
		</div>
	);
}
