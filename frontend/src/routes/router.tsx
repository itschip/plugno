import { LandingRoute } from '@features/landing/route';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingRoute />,
	},
]);
