import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";
import TopicBtn from "./Article/TopicBtn";
import { UserContext } from "../contexts/User";
import { FaRegUserCircle } from "react-icons/fa";

import ToggleMode from "./ToggleMode";
import TemporaryDrawer from "./DrawerMenu";

import ErrorPage from "./ErrorPage";
import Search from "./Search";

export default function Header({
	setCurrentSearch,
	setSearchParams,
	searchParams,
}) {
	const [allTopics, setAllTopics] = useState([]);
	const topicQuery = searchParams.get("topic");
	const { user } = useContext(UserContext);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		getTopics()
			.then(({ data }) => {
				const topics = data.topics.map((topic) => topic.slug);
				setAllTopics(topics);
			})
			.catch(() => {
				setIsError(true);
			});
	}, [searchParams]);

	const SetTopicPath = (topic) => {
		const newParams = new URLSearchParams("topic");
		newParams.set("topic", topic);
		setSearchParams(newParams);
	};

	if (isError) {
		return <ErrorPage />;
	}

	return (
		<div className="mb-3">
			<div className="row-span-1 h-16 flex flex-wrap ">
				<h1 className="nc-title text-5xl absolute top-5 ">NC NEWS</h1>

				<div
					id="search-input-container"
					className="absolute right-0 top-0 inline-flex h-10 mb:w-1/3 w-8/9 "
				></div>
				<div className="post-btn-container absolute right-10 top-20 ">
					<Link to="/news/user">
						<button className=" bg-bgHighlight rounded-lg text-2xl text-textHighlight ">
							{" "}
							+ Post Article
						</button>
					</Link>
				</div>
				<div className="search-btn-container absolute right-20 top-0 mt-4 mx-1 w-1/4 ">
					<Search setCurrentSearch={setCurrentSearch} />
				</div>
				<div className="mode-btn-container absolute right-10 top-0 mt-4 mx-1 ">
					<ToggleMode />
				</div>

				<div className="sign-in-container absolute right-0 top-0 ">
					{user.username ? (
						<Link to="/news/users/profile">
							<img
								className="object-cover rounded-full h-7 w-7 mt-4 "
								alt={`${user.username}'s avatar`}
								src={user.avatar_url}
							/>
						</Link>
					) : (
						<Link to="/news/users/login">
							<FaRegUserCircle size={32} className="mt-4 " />
						</Link>
					)}
				</div>
			</div>

			<nav className="flex flex-inline ">
				<TemporaryDrawer searchParams={searchParams} />

				<div
					id="topic-btn-container"
					className=" grid-cols-6 justify-around content-center mx-20 "
				>
					<Link to="/news">
						<button
							className={
								!topicQuery
									? "rounded-lg  mx-4 border-solid bg-bgHighlight  text-xl  p-1 topic-btn "
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
		</div>
	);
}
