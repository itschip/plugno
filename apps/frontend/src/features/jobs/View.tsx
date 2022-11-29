import { Link } from 'react-router-dom';
import { useJobs } from './api/useJobs';

export const View = () => {
	const { isLoading, error, data } = useJobs();

	return (
		<div className="h-screen bg-neutral-900">
			<div className="w-full">
				<div className="mx-auto  xl:max-w-7xl py-10 px-3 xl:px-0">
					<div className="flex items-center space-x-4">
						<h1 className="text-white text-4xl font-extrabold">Jobber</h1>
						<Link
							to="new"
							className="py-1.5 px-2.5 rounded-md bg-rose-500/60 hover:bg-rose-600/60 border border-rose-600/60 text-white shadow-sm"
						>
							Legg ut jobb
						</Link>
					</div>
					<div className="mt-8 grid grid-cols-4 gap-4">
						{data &&
							data.map((job) => (
								<div key={job.id}>
									<div className="border border-gray-700 h-72 rounded-md shadow-sm p-2">
										<h2 className="text-white text-lg font-bold">{job.title}</h2>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};
