'use client';

import { Input } from '@plugs/ui';
import { RootState } from '@store/store';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';

export default function NewJobView() {
	const [title, setTitle] = useState<string>('');
	const [shortDescription, setShortDescription] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [images, setImages] = useState<FileList | null>(null);
	const [price, setPrice] = useState<string>('');

	const user = useSelector((state: RootState) => state.auth.user);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.files);
		setImages(e.target.files);
	};

	const handleCreateJob = async () => {
		fetch('http://localhost:6001/jobs/new', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				title,
				shortDescription,
				description,
				askingPrice: parseInt(price, 10),
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
						<h1 className="text-white text-4xl font-extrabold">Legg ut ny jobb</h1>{' '}
					</div>
					<div className="mt-8 mx-auto max-w-xl">
						<div>
							<Input
								value={title}
								onChange={(e) => setTitle(e.currentTarget.value)}
								placeholder="Jobtittel"
								className="w-full"
							/>
						</div>
						<div className="mt-4">
							<input
								value={shortDescription}
								onChange={(e) => setShortDescription(e.currentTarget.value)}
								placeholder="Kort beskrivelse"
								className="bg-neutral-800 text-white border border-neutral-700 py-2 px-3 rounded-md w-full outline-none"
							/>
						</div>
						<div className="mt-4">
							<textarea
								value={description}
								onChange={(e) => setDescription(e.currentTarget.value)}
								placeholder="Beskrivelse"
								className="resize-none bg-neutral-800 text-white border border-neutral-700 py-2 px-3 h-32 rounded-md w-full outline-none"
							/>
						</div>
						<div className="mt-10">
							<input
								value={price}
								onChange={(e) => setPrice(e.currentTarget.value)}
								placeholder="Pris for jobben"
								type="number"
								className="apperance-none bg-neutral-800 text-white border border-neutral-700 py-2 px-3 rounded-md w-full outline-none"
							/>
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
								onClick={handleCreateJob}
								className="cursor-pointer text-white w-full bg-rose-500/60 hover:bg-rose-600/60 border border-rose-600/60 py-2 rounded-md"
							>
								Legg ut jobb
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
