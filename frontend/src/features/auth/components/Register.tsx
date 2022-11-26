import { useState } from 'react';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleRegister = async () => {
		fetch('http://localhost:6001/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});
	};

	return (
		<div className="bg-neutral-900 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<div>
					<h2 className="text-center text-3xl text-white font-bold tracking-tight">
						Lag en bruker
					</h2>
					<p className="mt-2 text-center text-sm text-gray-300">
						Eller{' '}
						<Link to="/login" className="font-medium text-rose-500 hover:text-red-600">
							logg inn
						</Link>
					</p>
				</div>
			</div>
			<div className="mt-8 shadow-sm sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-neutral-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-4">
					<div>
						<label htmlFor="username" className="block text-sm font-medium text-gray-300">
							Brukernavn
						</label>
						<div className="mt-1">
							<input
								id="username"
								name="username"
								type="text"
								required
								className="block w-full outline-none text-white rounded-md bg-neutral-700 border border-neutral-600 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
								value={username}
								onChange={(e) => setUsername(e.currentTarget.value)}
							/>
						</div>
					</div>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-300">
							E-post
						</label>
						<div className="mt-1">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="block w-full outline-none text-white rounded-md bg-neutral-700 border border-neutral-600 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
								value={email}
								onChange={(e) => setEmail(e.currentTarget.value)}
							/>
						</div>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-300">
							Passord
						</label>
						<div className="mt-1">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="block w-full outline-none text-white rounded-md bg-neutral-700 border border-neutral-600 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
								value={password}
								onChange={(e) => setPassword(e.currentTarget.value)}
							/>
						</div>
					</div>
					<div>
						<button
							onClick={handleRegister}
							className="flex w-full justify-center rounded-md border border-rose-600/60 bg-rose-500 bg-opacity-60 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-600/60 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
						>
							Registrer bruker
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
