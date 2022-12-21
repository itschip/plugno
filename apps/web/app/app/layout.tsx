'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '@components/layout/AppHeader';
import { Dispatch, RootState } from '@store/store';
import { User } from '@typings/user';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const dispatch = useDispatch<Dispatch>();
	const userState = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		(async () => {
			fetch('http://localhost:6001/user', {
				credentials: 'include',
				headers: {
					Authorization: 'Bearer hello world',
					'Content-Type': 'application/json',
				},
			})
				.then((res) => {
					if (!res.ok) {
						return router.push('/login');
					}

					return res.json();
				})
				.then((data: User) => {
					console.log('user data', data);
					if (!userState) {
						dispatch.auth.populate(data);
					}
				});
		})();
	}, []);

	if (!userState) return null;

	return (
		<div className="flex flex-col min-h-screen bg-neutral-900">
			<Header />
			<section>{children}</section>
		</div>
	);
}
