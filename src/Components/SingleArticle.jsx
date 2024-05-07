import { useParams } from "react-router-dom";
import { getArticleById, getCommentByArticleId } from "./api";
import { useState, useEffect } from "react";
import {
	AiOutlineLike,
	AiOutlineComment,
	AiOutlineDislike,
} from "react-icons/ai";
import CommentCard from "./CommentCard";
import Badge from "@mui/material/Badge";

export default function SingleArticle() {
	const { article_id } = useParams();
	const [singleArticle, setSingleArticle] = useState({});
	const [comments, setComments] = useState([]);

	const {
		title,
		author,
		created_at,
		votes,
		article_img_url,
		comment_count,
		body,
	} = singleArticle;

	useEffect(() => {
		getArticleById(article_id)
			.then(({ data }) => {
				setSingleArticle(() => {
					return data.article;
				});
			})
			.catch(() => {});
	}, [article_id, comment_count]);

	useEffect(() => {
		getCommentByArticleId(article_id)
			.then(({ data }) => {
				setComments(() => {
					return data.comments;
				});
			})
			.catch(() => {});
	}, [article_id, comment_count]);

	return (
		<div className="mx-2">
			<h2 className="title text-3xl font-bold my-3">{title}</h2>
			<div className="flex">
				<p className="mx-2 italic">{author}</p>
				<p className="ml-2">
					{new Date(Date.now()).getFullYear() -
						new Date(created_at).getFullYear()}{" "}
					years ago
				</p>
			</div>
			<img
				className="article-img my-3 mx-3"
				src={article_img_url}
				alt={`image of article {title}`}
			/>
			<p className="mx-5 my-5 text-lg">{body}</p>
			<Badge
				badgeContent={votes}
				color="success"
				className="text-yellow-800 badge-color mx-3 font-bold block"
			>
				<button>
					<AiOutlineLike className="mx-2 size-8" />
				</button>
			</Badge>
			<Badge
				badgeContent={votes}
				color="success"
				className="text-yellow-800 badge-color mx-3 font-bold block"
			>
				<button>
					<AiOutlineDislike className="mx-2 size-8" />
				</button>
			</Badge>
			<button className="my-3 btn-hl rounded-full block text-2xl p-2">
				{" "}
				+ Post new comment
			</button>
			<p className="inline-block">Comments</p>
			<Badge
				badgeContent={comment_count}
				color="success"
				className="text-yellow-800 badge-color mx-3 font-bold"
			>
				<AiOutlineComment className="mx-2 size-8" />
			</Badge>
			{comments.map((comment) => {
				return <CommentCard key={comment.comment_id} comment={comment} />;
			})}
		</div>
	);
}
