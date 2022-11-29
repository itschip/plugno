export const NewJobView = () => {
	return (
		<div className="h-screen bg-neutral-900">
			<div className="w-full text-center">
				<div className="mx-auto w-full py-10 px-3 xl:px-0">
					<div>
						<h1 className="text-white text-4xl font-extrabold">Legg ut ny jobb</h1>
					</div>
					<div className="mt-8 mx-auto max-w-xl">
						<div>
							<input
								placeholder="Jobtittel"
								className="bg-neutral-800 text-white border border-neutral-700 py-2 px-3 rounded-md w-full outline-none"
							/>
						</div>
						<div className="mt-4">
							<input
								placeholder="Kort beskrivelse"
								className="bg-neutral-800 text-white border border-neutral-700 py-2 px-3 rounded-md w-full outline-none"
							/>
						</div>
						<div className="mt-4">
							<textarea
								placeholder="Beskrivelse"
								className="resize-none bg-neutral-800 text-white border border-neutral-700 py-2 px-3 h-32 rounded-md w-full outline-none"
							/>
						</div>
						<div className="mt-10">
							<input
								placeholder="Pris"
								type="number"
								className="bg-neutral-800 text-white border border-neutral-700 py-2 px-3 rounded-md w-full outline-none"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
