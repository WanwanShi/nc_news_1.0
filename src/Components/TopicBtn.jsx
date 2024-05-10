export default function TopicBtn({ SetTopicPath, topic, searchParams }) {
	return (
		<>
			<button
				className={
					searchParams.get("topic") === topic
						? "rounded-lg  mx-4 border-solid btn-hl text-xl p-1 capitalize topic-btn"
						: "rounded-lg  mx-4 border-solid text-xl p-1 capitalize  topic-btn"
				}
				value={topic}
				onClick={() => SetTopicPath(topic)}
			>
				{topic}
			</button>
		</>
	);
}
