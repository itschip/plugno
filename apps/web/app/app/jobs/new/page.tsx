'use client';

import { Input } from '@plugs/ui';
import { RootState } from '@store/store';
import { classes } from '@utils/css';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

type JobForm = {
	title: string;
	shortDescription: string;
	description: string;
	price: string;
};

const formError = {
	title: 'Please fill in a title',
	shortDescription: 'Please fill in a short description',
	description: 'Please fill in a description',
	price: 'Please fill in a price',
};

const ErrorMessage = ({ message }: { message: string }) => (
	<p className="text-red-400 mt-1 text-left">{message}</p>
);

export default function NewJobView() {
	const user = useSelector((state: RootState) => state.auth.user);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<JobForm>();

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.files);
		//setImages(e.target.files);
	};

	const onSubmit = async (data: JobForm) => {
		console.log('data', data);
		await handleCreateJob(data);
	};

	const handleCreateJob = async (data: JobForm) => {
		fetch('http://localhost:6001/jobs/new', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				title: data.title,
				shortDescription: data.shortDescription,
				description: data.description,
				askingPrice: parseInt(data.price, 10),
				userId: user?.id,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	};

	return (
		<div className="h-screen bg-neutral-900">
			<div className="w-full text-center">
				<div className="mx-auto w-full py-10 px-3 xl:px-0">
					<div>
						<h1 className="text-white text-4xl font-extrabold">Legg ut ny jobb</h1>
					</div>
					<div className="mt-8 mx-auto max-w-xl">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div>
								<Input
									{...register('title', { required: true })}
									placeholder="Jobtittel"
									className={classes(
										errors.title?.type === 'required' ? 'ring-1 ring-red-400' : '',
										'w-full',
									)}
								/>
								{errors.title?.type === 'required' && <ErrorMessage message={formError.title} />}
							</div>
							<div className="mt-4">
								<Input
									{...register('shortDescription', { required: true })}
									placeholder="Kort beskrivelse"
									className={classes(
										errors.shortDescription?.type === 'required' ? 'ring-1 ring-red-400' : '',
										'w-full',
									)}
								/>
								{errors.shortDescription?.type === 'required' && (
									<ErrorMessage message={formError.shortDescription} />
								)}
							</div>
							<div className="mt-4">
								<textarea
									{...register('description', { required: true })}
									placeholder="Beskrivelse"
									className={classes(
										errors.description?.type === 'required' ? 'ring-1 ring-red-400' : '',
										'resize-none bg-neutral-800 text-white border border-neutral-700 py-2 px-3 h-32 rounded-md w-full outline-none',
									)}
								/>
								{errors.description?.type === 'required' && (
									<ErrorMessage message={formError.description} />
								)}
							</div>
							<div className="mt-10">
								<Input
									{...register('price', { required: true })}
									placeholder="Pris for jobben"
									type="number"
									className={classes(
										errors.price?.type === 'required' ? 'ring-1 ring-red-400' : '',
										'w-full',
									)}
								/>
								{errors.price?.type === 'required' && <ErrorMessage message={formError.price} />}
							</div>
							{/* <div className="mt-8 flex items-center space-x-4">
							<input
								id="jobImage"
								onChange={handleImageChange}
								hidden
								type="file"
								accept="image/*"
							/>
							<label htmlFor="jobImage">
								<div className="h-32 w-32 border border-neutral-600 cursor-pointer hover:bg-neutral-800/60 rounded-md flex items-center justify-center">
									<PhotoIcon className="h-10 w-10 text-gray-300" />
								</div>
							</label>
							{images?.length &&
								Object.entries(images).map((_, i) => (
									<div key={images[i].name}>
										<img
											style={{
												backgroundImage: `url(${URL.createObjectURL(images[i])}`,
											}}
											className="w-32 h-32 bg-cover bg-center"
										/>
									</div>
								))}
						</div> */}
							<div className="mt-10">
								<button
									type="submit"
									className="cursor-pointer text-white w-full bg-rose-500/60 hover:bg-rose-600/60 border border-rose-600/60 py-2 rounded-md"
								>
									Legg ut jobb
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
