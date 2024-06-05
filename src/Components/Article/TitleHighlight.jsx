export default function TitleHighlight({ title, bgColor }) {
	return (
		<div className="inline-block relative">
			<div
				className={`absolute bottom-1 left-0 w-full h-2 opacity-60  bottom: '-0.2rem' bg-${bgColor}`}
			></div>
			<span className="font-bold text-3xl  pb-1">{title}</span>
		</div>
	);
}
