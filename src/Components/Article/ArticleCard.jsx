import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
export default function ArticleCard({ article, avatarObj }) {
	const {
		title,
		article_img_url,
		votes,
		comment_count,
		author,
		article_id,
		created_at,
	} = article;

	return (
		<article className="col-span-4 hover:scale-105 transition duration-300 ease-in-out">
			<Link to={`/news/${article_id}`} state={{ avatarObj }}>
				<div className="article-card-container   h-70 my-3 mx-3 p-2 ">
					<div className="article-list-img-container  h-60 overflow-hidden">
						<img
							className="rounded-lg h-full  object-cover"
							alt={`img of article ${title}`}
							src={article_img_url}
						/>
					</div>
					<div className="flex flex-end justify-between mt-2">
						<h2>
							<section className="username flex ">
								<img
									className="object-cover rounded-full h-6 w-6 flex-inline mr-4"
									alt={`${author}'s avatar`}
									src={avatarObj[author]}
								/>
								<p className="text-lg font-bold">{author}</p>
							</section>
						</h2>
						<div className="like-comment flex flex-row-reverse">
							<Badge
								badgeContent={comment_count}
								className="mx-3 font-bold bg-gray-500"
							>
								<AiOutlineComment className="mx-1 size-8 mb:size-6 tb:size-6" />
							</Badge>
							<Badge badgeContent={votes} color="success" className="">
								<AiOutlineLike className=" mx-1 size-8 mb:size-6 tb:size-6" />
							</Badge>
						</div>
					</div>

					<h3 className="text-xl font-bold title  article-title mt-1">
						{title}
					</h3>
					<div className="flex flex-inline ">
						<p className="text-md text-strongHighlight article-topic mr-2 text-transform capitalize font-bold">
							{article.topic}
						</p>
						<p className="text-md  article-date">
							{new Date(Date.now()).getFullYear() -
								new Date(created_at).getFullYear()}{" "}
							years ago
						</p>
					</div>
				</div>
			</Link>
		</article>
	);
}
