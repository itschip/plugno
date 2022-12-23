import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<nav className="bg-gray-100 h-20 px-3 w-max-7xl mx-auto flex items-center justify-between">
				<div className="pl-2">
					<img src="/logo-black.svg" className="h-24 w-24" />
				</div>
				<div className="flex space-x-4 items-center">
					<Link
						href="/login"
						className="bg-gray-300 px-2.5 py-1.5 font-medium rounded-md shadow-sm"
					>
						Login
					</Link>
					<Link
						href="/register"
						className="bg-black py-1.5 px-2.5 text-white font-medium rounded-md shadow-sm"
					>
						Register
					</Link>
				</div>
			</nav>
			<main className="bg-gray-100 min-h-screen">
				<div>
					<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
							<h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
								<span className="block">Trenger du hjelp med noe?</span>
								<span className="block text-yellow-400">Finn en plug.</span>
							</h1>
							<p className="mx-auto mt-6 max-w-lg text-center text-xl text-gray-500 sm:max-w-3xl">
								Vi jobber hardt for at hjelp skal v&aelig;re lett tilgjengelig for alle, uansett
								behov. Hos Plug.no kan du finne plugs som kan stille opp til alle d&oslash;gnes
								tider for &aring; fikse noe for deg.
							</p>
							<div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
								<div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
									<a
										href="#"
										className="flex items-center justify-center rounded-md bg-black px-4 py-3 text-base font-medium text-white shadow-sm sm:px-8"
									>
										Om Plug.no
									</a>
									<a
										href="#"
										className="flex items-center justify-center rounded-md bg-yellow-400 px-4 py-3 text-base font-medium text-white shadow-sm sm:px-8"
									>
										Se alle plugs
									</a>
								</div>
							</div>
						</div>
						<div className="text-center px-4 sm:px-6 lg:px-8">
							<div className="flex items-center justify-center space-x-4">
								<input
									placeholder="S&oslash;k etter hjelp om alt mulig..."
									className="bg-gray-200 text-lg shadow-sm text-white outline-none focus:ring focus:ring-2 focus:ring-yellow-400 border-neutral-700 px-2 py-2 sm:py-3 rounded-md w-full max-w-2xl lg:max-w-4xl"
								/>
								<button className="text-white px-3 text-lg sm:px-5 py-2 sm:py-3 rounded-md bg-yellow-400">
									S&oslash;k
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
