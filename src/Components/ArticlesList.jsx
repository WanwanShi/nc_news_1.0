import { useState, useEffect } from "react";
import getArticles from "./api";
import { getUsers } from "./api";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";

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
		return <ErrorPage />;
	}

	if (isLoading) {
		return <Loading />;
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
