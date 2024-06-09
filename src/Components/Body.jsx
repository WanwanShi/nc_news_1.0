import ArticlesList from "./Article/ArticlesList";
import { useEffect, useState } from "react";

import { groupArticlesByUser } from "../utils/api";
import UserAvatar from "./User/UserAvatar";
import Footer from "./Footer";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import TitleHighlight from "./Article/TitleHighlight";
export default function Body({ currentSearch, searchParams }) {
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [topCreator, setTopCreator] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
		groupArticlesByUser()
			.then((sortedArticlesByAuthor) => {
				setTopCreator(sortedArticlesByAuthor);
				setIsLoading(false);
				setIsError(false);
			})
			.catch(() => {
				setIsError(true);
				setIsLoading(false);
			});
	}, []);
	if (isError) {
		return <ErrorPage />;
	}
	if (isLoading) {
		return <Loading />;
	}
	return (
		<div className="min-h-screen ">
			<div className=" flex flex-col w-6/8 mx-auto ">
				<ArticlesList
					currentSearch={currentSearch}
					searchParams={searchParams}
				/>
			</div>
			<div className="ml-5">
				<TitleHighlight
					title="Top Creators"
					bgColor="strongHighlight"
					className="w-fit-content "
				/>
			</div>
			<div className="flex flex-col mx-auto mt-3 ml-5">
				<div className="grid  grid-flow-row grid-cols-12 ">
					{topCreator.slice(0, 5).map((user, index) => {
						return <UserAvatar key={index} user={user} />;
					})}
				</div>
			</div>
			<Footer />
		</div>
	);
}
