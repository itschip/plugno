import { DetailedJob, Job } from '@typings/jobs';

async function getJobData(id: number): Promise<DetailedJob> {
	const res = await fetch(`http://localhost:6001/jobs/getOne?id=${id}`);

	if (!res.ok) {
		throw new Error('Failed to find job');
	}

	return res.json();
}

export default async function JobPage({ params }: { params: { id: number } }) {
	const jobData = await getJobData(params.id);

	console.log('job data', jobData);

	return (
		<div className="h-screen bg-neutral-900">
			<div className="w-full">
				<div className="mx-auto xl:max-w-7xl py-10 px-3 xl:px-0">
					<span className="flex items-center space-x-2 group hover:cursor-pointer">
						<img
							className="h-10 w-10 rounded-full"
							src="https://avatars.githubusercontent.com/u/59088889?v=4"
						/>
						<h3 className="text-gray-200 group-hover:text-rose-500 group-hover:underline font-semibold text-lg">
							{jobData.username}
						</h3>
					</span>
					<div className="flex items-baseline space-x-8 mt-4">
						<h1 className="text-white text-5xl font-extrabold">{jobData.title}</h1>
					</div>
					<p className="text-md text-gray-300 mt-2">{jobData.shortDescription}</p>
					<p className="text-gray-300 text-3xl font-bold mt-4">{jobData.askingPrice} NOK</p>

					<div className="mt-8 flex items-start justify-start space-x-8">
						<img src="/sofa.jpeg" className="rounded-md w-full max-w-lg" />
						<div>
							<p className="text-gray-300 fle-grow text-lg">{jobData.description}</p>
							<button className="bg-rose-500/60 border border-rose-600/60 px-2 py-2 rounded-md text-white hover:bg-rose-600/60 mt-8">
								Send melding
							</button>
						</div>
					</div>
					<div className="mt-2"></div>
				</div>
			</div>
		</div>
	);
}
