import { createBrowserRouter } from 'react-router-dom';
import { LoginRoute } from '../features/auth/auth-routes';
import { LandingRoute } from '../features/landing/landing-routes';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingRoute />,
	},
	{
		path: '/login',
		element: <LoginRoute />,
	},
]);
