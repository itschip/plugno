import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Dispatch, RootState } from '../../store/store';
import { User } from '../../typings/user';
import { Header } from './components/Header';

export const AppLayout = () => {
	const navigate = useNavigate();
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
						navigate('/login');
						throw new Error('You are not authorized');
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

	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};
