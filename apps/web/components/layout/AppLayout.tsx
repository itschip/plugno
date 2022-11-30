'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../store/store';
import { Header } from './AppHeader';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const dispatch = useDispatch<Dispatch>();
	const userState = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		(async () => {
			fetch('http://localhost:6001/user', {
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((res) => {
					if (!res.ok) {
						console.log('YOU DO NOT HAVE A TOKEN');
						router.push('/login');
						throw new Error('You are not authorized');
					}

					return res.json();
				})
				.then((data: any) => {
					console.log('user data', data);
					if (!userState) {
						dispatch.auth.populate(data);
					}
				});
		})();
	}, []);

	return (
		<div>
			<Header />
			{children}
		</div>
	);
};
