import ArticleCard from "./ArticleCard";
import FirstNews from "./FirstNews";

export default function TrendingArticles({ allArticles, avatarObj }) {
	const articles = allArticles.map((article) => {
		return { ...article };
	});
	articles.sort((a, b) => b.votes - a.votes);
	return (
		<>
			<FirstNews article={articles[0]} />
			<div className="article-list-container  grid grid-flow-row grid-cols-12 w-7/9 mx-10">
				{articles.slice(1, 4).map((article) => {
					return (
						<ArticleCard
							key={article.article_id}
							article={article}
							avatarObj={avatarObj}
						/>
					);
				})}
			</div>
		</>
	);
}
