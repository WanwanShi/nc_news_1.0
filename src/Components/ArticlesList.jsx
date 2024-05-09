import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import NoDataFound_Animation from "../assets/NoDataFound_Animation - 1714682242871.json";
import getArticles from "./api";
import { getUsers } from "./api";
import ArticleCard from "./ArticleCard";
import Loading_animation from "../assets/loading-Animation - 1715019994255.json";

export default function ArticlesList({ currentSearch, searchParams }) {
	const [allArticles, setAllArticles] = useState([]);
	const [isError, setIsError] = useState(false);
	const [allUsers, setAllUsers] = useState([]);
	const topicQuery = searchParams.get("topic");
	const sortByQuery = searchParams.get("sort_by");
	const orderQuery = searchParams.get("order");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
		getArticles(topicQuery, sortByQuery, orderQuery)
			.then(({ data }) => {
				let articlesDisplayed = data.articles;
				setAllArticles(() => {
					return articlesDisplayed;
				});
			})
			.catch(() => {
				setIsError(true);
			});
		getUsers()
			.then(({ data }) => {
				setAllUsers(data.users);
				setIsLoading(false);
			})
			.catch(() => {
				setIsError(true);
				setIsLoading(false);
			});
	}, [currentSearch, topicQuery, sortByQuery, orderQuery]);

	let avatarObj = {};
	allUsers.forEach((user) => {
		avatarObj[user.username] = user.avatar_url;
	});

	if (isError) {
		return (
			<div className="size-96 mx-auto">
				<h2 className="my-3 text-2xl">Oops, it seems there is no articles</h2>
				<div className="animation-container" id="no-data-animation-container">
					<Lottie
						animationData={NoDataFound_Animation}
						loop={true}
						id="no-data-animation"
					/>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<>
				<h2>Almost there, we are trying to get the articles you want.....</h2>
				<Lottie
					animationData={Loading_animation}
					loop={true}
					id="loading-animation"
				/>
			</>
		);
	} else {
		return (
			<div className="w-8/9">
				{allArticles.map((article) => {
					return (
						<ArticleCard
							key={article.article_id}
							article={article}
							avatarObj={avatarObj}
						/>
					);
				})}
			</div>
		);
	}
}
