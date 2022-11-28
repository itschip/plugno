import { createBrowserRouter } from 'react-router-dom';
import { LoginRoot, RegisterRoot } from '../features/auth/auth-routes';
import { JobsRoot } from '../features/jobs/jobs-routes';
import { LandingRoute } from '../features/landing/landing-routes';
import { AppLayout } from '../features/layout/AppLayout';
import { View } from '../features/plugs/View';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingRoute />,
	},
	{
		path: '/login',
		element: <LoginRoot />,
	},
	{
		path: '/register',
		element: <RegisterRoot />,
	},
	{
		path: '/app',
		element: <AppLayout />,
		children: [
			{
				path: '/app',
				element: <div>Home</div>,
			},
			{
				path: 'plugs',
				element: <View />,
			},
			{
				path: 'jobber',
				element: <JobsRoot />,
			},
		],
	},
]);
