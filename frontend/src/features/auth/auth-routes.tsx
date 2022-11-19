export const LoginRoute = () => {
	return (
		<div className="bg-gray-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<div>
					<h2 className="text-center text-3xl font-bold tracking-tight">Logg inn</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Eller{' '}
						<a href="#" className="font-medium text-red-500 hover:text-red-600">
							lag en bruker.
						</a>
					</p>
				</div>
			</div>
			<div className="mt-8 bg-white shadow-sm sm:mx-auto sm:w-full sm:max-w-md">
				<h2>Login</h2>
			</div>
		</div>
	);
};
