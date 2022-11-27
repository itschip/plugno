import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AppLayout = () => {
	const navigate = useNavigate();

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
				.then((data) => {
					console.log('user data', data);
				});
		})();
	}, [navigate]);

	return (
		<div>
			<Outlet />
		</div>
	);
};
