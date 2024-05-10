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
			<div className="row-span-1 h-16 flex flex-wrap">
				<h1 className="nc-title text-5xl absolute top-5">NC NEWS</h1>
				<div
					id="search-input-container"
					className="absolute right-0 top-0 inline-flex h-10 mb:w-1/3 w-8/9"
				>
					<input
						className="search-input rounded-full p-2 mt-3 mb:w-2/3 w-1/8"
						type="text"
						value={searchInput}
						placeholder="topic author"
						aria-label="Enter search term"
						onChange={(e) => {
							setSearchInput(e.target.value);
						}}
					/>
					<button
						aria-label="search button"
						value="search click"
						onClick={handleSearchClick}
					>
						<Lottie
							className="search-ani h-12 mb:1/4"
							animationData={search}
							loop={false}
						/>
					</button>
				</div>
			</div>

			<nav>
				<div
					id="topic-btn-container"
					className="bg-hl grid-cols-6 justify-around content-center"
				>
					<Link to="/news">
						<button
							className={
								!topicQuery
									? "rounded-lg  mx-4 border-solid btn-hl text-xl p-1 topic-btn"
									: "rounded-lg  mx-4 border-solid  text-xl p-1 topic-btn "
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
			</nav>
		</>
	);
}
