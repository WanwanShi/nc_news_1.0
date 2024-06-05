import { useState, useEffect } from "react";
import getArticles from "../../utils/api";
import { getUsers } from "../../utils/api";
import ArticleCard from "./ArticleCard";
import ErrorPage from "../ErrorPage";
import Loading from "../Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import ControlledCarousel from "./NewsCarousel";
import { getUniqueNews } from "../../utils/utils";
import FirstNews from "./FirstNews";
import TitleHighlight from "./TitleHighlight";
import TrendingArticles from "./TrendingArticles";
import { FaHotjar, FaNewspaper } from "react-icons/fa";

export default function ArticlesList({ currentSearch, searchParams }) {
	const [allArticles, setAllArticles] = useState([]);
	const [isError, setIsError] = useState(false);
	const [allUsers, setAllUsers] = useState([]);
	const topicQuery = searchParams.get("topic");
	const sortByQuery = searchParams.get("sort_by");
	const orderQuery = searchParams.get("order");
	const [isLoading, setIsLoading] = useState(true);
	// const [limit, setLimit] = useState(7);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [noMoreArticles, setNoMoreArticles] = useState(false);

	const uniqueArticles = getUniqueNews(allArticles);
	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
		getArticles(topicQuery, sortByQuery, orderQuery, 6, currentPage)
			.then(({ data }) => {
				let articlesDisplayed = data.articles;
				setIsError(false);
				setAllArticles(() => {
					return articlesDisplayed;
				});
				setCurrentPage((currentPage) => currentPage + 1);
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

	const loadMoreArticles = () => {
		if (allArticles.length < 37) {
			setCurrentPage((currentPage) => {
				return currentPage + 1;
			});
			setIsLoadingMore(true);
			getArticles(topicQuery, sortByQuery, orderQuery, 6, currentPage)
				.then(({ data }) => {
					setAllArticles((prevArticles) => [...prevArticles, ...data.articles]);
					setIsLoadingMore(false);
				})
				.catch(() => {
					setIsError(true);
					setIsLoadingMore(false);
				});
		} else {
			setNoMoreArticles(true);
		}
	};

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
			<>
				{!topicQuery && (
					<div className="top-news-container mb-10 mx-auto  relative ">
						<ControlledCarousel articles={uniqueArticles} />
						<hr className=" mt-10 w-full border-b border-black-500 border-3" />
					</div>
				)}
				<div className="mx-20 flex">
					<TitleHighlight
						title="Latest News"
						bgColor="strongHighlight"
						className="inline-block"
					/>
					<FaNewspaper size={32} className=" mx-3  inline-block" />
				</div>
				<FirstNews article={allArticles[0]} />
				<div className="article-list-container  grid grid-flow-row grid-cols-12 w-7/9 mx-10 ">
					{allArticles.slice(1).map((article) => {
						return (
							<ArticleCard
								key={article.article_id}
								article={article}
								avatarObj={avatarObj}
							/>
						);
					})}
				</div>
				<div className=" w-7/9 mx-10 flex justify-center items-center hover:scale-105 transition duration-300 ease-in-out">
					{isLoadingMore ? (
						<p className="text-center text-gray-500">Loading...</p>
					) : noMoreArticles ? (
						<p className="text-center text-gray-500">No more articles</p>
					) : (
						<button
							onClick={loadMoreArticles}
							className="text-center text-gray-500 underline cursor-pointer title font-bold text-xl"
						>
							View More
						</button>
					)}
				</div>
				<hr className=" mt-10 w-full border-b border-black-500 border-3" />
				<div className="ml-5 flex ">
					<TitleHighlight title="Trending" bgColor="strongHighlight" />
					<FaHotjar size={24} color="#d00014e3" className=" mx-3 mt-2" />
				</div>
				<TrendingArticles allArticles={allArticles} avatarObj={avatarObj} />
			</>
		);
	}
}
