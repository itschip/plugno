//import Conversations from '@components/chat/Conversations';

export default function ChatPageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-gray-100">
			<div className="mx-auto xl:max-w-7xl py-10 px-3 xl:px-0">
				<div className="flex justify-start space-x-10">{children}</div>
			</div>
		</div>
	);
}
