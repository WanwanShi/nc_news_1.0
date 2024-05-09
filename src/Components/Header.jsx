import { useEffect, useState } from "react";
import search from "../assets/search.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { getTopics } from "./api";
import TopicBtn from "./TopicBtn";

export default function Header({
	setCurrentSearch,
	setSearchParams,
	searchParams,
}) {
	const [searchInput, setSearchInput] = useState("");
	const [allTopics, setAllTopics] = useState([]);
	const topicQuery = searchParams.get("topic");
	const handleSearchClick = () => {
		setCurrentSearch(searchInput);
	};

	useEffect(() => {
		getTopics().then(({ data }) => {
			const topics = data.topics.map((topic) => topic.slug);
			setAllTopics(topics);
		});
	}, [searchParams]);

	const SetTopicPath = (topic) => {
		const newParams = new URLSearchParams("topic");
		newParams.set("topic", topic);
		setSearchParams(newParams);
	};

	return (
		<>
			<div className="row-span-1 h-16">
				<h1 className="nc-title text-5xl absolute top-5">NC NEWS</h1>
				<div className="absolute right-0 top-0 inline-flex h-10 w-8/9">
					<input
						className="search-input bg-hl rounded-full p-2 mt-3 w-1/10"
						type="text"
						value={searchInput}
						placeholder="topic author"
						onChange={(e) => {
							setSearchInput(e.target.value);
						}}
					/>
					<button onClick={handleSearchClick}>
						<Lottie
							className="search-ani h-12"
							animationData={search}
							loop={false}
						/>
					</button>
				</div>
			</div>

			<div className="bg-hl grid-cols-6 justify-around content-center">
				<Link to="/news">
					<button
						className={
							!topicQuery
								? "rounded-lg  mx-4 border-solid btn-hl text-xl p-1"
								: "rounded-lg  mx-4 border-solid  text-xl p-1"
						}
						value="all"
						onClick={SetTopicPath}
					>
						All news
					</button>
				</Link>

				{allTopics.map((topic) => {
					return (
						<TopicBtn
							key={topic}
							topic={topic}
							SetTopicPath={SetTopicPath}
							searchParams={searchParams}
						/>
					);
				})}
			</div>
		</>
	);
}
