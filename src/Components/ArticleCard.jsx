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
		<article>
			<Link to={`/news/${article_id}`} state={{ avatarObj }}>
				<div className="article-card-container border-4 border-black h-50 my-5 mx-16 p-2">
					<h2>
						<section className="username flex my-2">
							<img
								className="object-cover rounded-full h-6 w-6 flex-inline mr-4"
								alt={`${author}'s avatar`}
								src={avatarObj[author]}
							/>
							<p className="text-lg font-bold">{author}</p>
						</section>
					</h2>

					<div className="article-list-img-container border-4 border-black flex justify-center my-3 h-60 overflow-hidden">
						<img
							className="object-fill min-h-full "
							alt={`img of article ${title}`}
							src={article_img_url}
						/>
					</div>

					<h3 className="text-3xl font-bold title my-2 article-title">
						{title}
					</h3>
					<p>
						{new Date(Date.now()).getFullYear() -
							new Date(created_at).getFullYear()}{" "}
						years ago
					</p>
					<div className="like-comment flex flex-row-reverse">
						<Badge
							badgeContent={comment_count}
							color="success"
							className="mx-3 font-bold"
						>
							<AiOutlineComment className="mx-2 size-8 mb:size-6 tb:size-6" />
						</Badge>
						<Badge badgeContent={votes} color="success" className="">
							<AiOutlineLike className=" mx-2 size-8 mb:size-6 tb:size-6" />
						</Badge>
					</div>
				</div>
			</Link>
		</article>
	);
}
