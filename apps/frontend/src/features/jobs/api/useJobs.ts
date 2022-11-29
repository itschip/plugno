import { useQuery } from '@tanstack/react-query';
import { Job } from '../../../typings/jobs';

export const useJobs = () =>
	useQuery<Job[]>({
		queryKey: ['jobsData'],
		queryFn: () => fetch('http://localhost:6001/jobs/findAll').then((res) => res.json()),
	});
