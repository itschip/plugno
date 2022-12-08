import Link from 'next/link';
import { Job } from '@typings/jobs';
import { MapPinIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/nb';

dayjs.extend(relativeTime);
dayjs.locale('nb');

async function getJobs(): Promise<Job[]> {
	const res = await fetch('http://localhost:6001/jobs/getAll', {
		credentials: 'include',
	});

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export default async function JobsPage() {
	const data = await getJobs();

	return (
		<div className="h-full h-screen bg-neutral-900">
			<div className="w-full">
				<div className="mx-auto  xl:max-w-7xl py-10 px-3 xl:px-0">
					<div className="flex items-center space-x-4">
						<h1 className="text-white text-4xl font-extrabold">Jobber</h1>
						<Link
							href="/app/jobs/new"
							className="py-1.5 px-2.5 rounded-md bg-rose-500/60 hover:bg-rose-600/60 border border-rose-600/60 text-white shadow-sm"
						>
							Legg ut jobb
						</Link>
					</div>
					<ul
						role="list"
						className="mt-8 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8"
					>
						{data &&
							data.map((job) => (
								<Link key={job.id} href={`/app/jobs/${job.id}`}>
									<li className="relative group hover:bg-neutral-800 p-2 rounded-md cursor-pointer">
										<div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg relative">
											<span className="text-white absolute bottom-2 left-2 bg-rose-800 text-rose-300 rounded-full px-2 text-sm">
												{job.askingPrice} NOK
											</span>
											<img src="/sofa.jpeg" alt="" className="pointer-events-none object-cover" />
										</div>
										<div className="mt-2">
											<div className="flex items-center justify-between">
												<div>
													<span className="text-gray-300 text-sm flex items-center">
														<MapPinIcon className="h-5 w-5 mr-1" />
														{job.locationName}
													</span>
												</div>
												<div>
													<p className="text-gray-300 text-sm">
														{dayjs().to(dayjs(job.createdAt))}
													</p>
												</div>
											</div>
											<h3 className="mt-4 block text-white font-semibold text-md break-words truncate">
												{job.title}
											</h3>
											<p className="text-sm text-gray-300 mt-2">{job.shortDescription}</p>
										</div>
									</li>
								</Link>
							))}
					</ul>
				</div>
			</div>
		</div>
	);
}
