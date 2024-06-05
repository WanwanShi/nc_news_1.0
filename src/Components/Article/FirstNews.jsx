import { Link } from "react-router-dom";

export default function FirstNews({ article }) {
	return (
		<Link to={`/article/${article.article_id}`}>
			<div className="first-news grid grid-cols-2 w-7/8 mx-20 mb-10 hover:scale-105 transition duration-300 ease-in-out">
				<div className="col-span-1 mx-20 ">
					<h2 className=" title text-3xl font-bold mb-4">{article.title}</h2>
					<p>{article.author}</p>
				</div>
				<div className="col-span-1">
					<img
						src={article.article_img_url}
						alt={article.title}
						className="rounded-lg"
					/>
				</div>
			</div>
		</Link>
	);
}
