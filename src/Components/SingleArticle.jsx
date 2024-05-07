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
import ArticleVotes from "./ArticleVotes";

export default function SingleArticle() {
	const { article_id } = useParams();
	const [singleArticle, setSingleArticle] = useState({});
	const [comments, setComments] = useState([]);
	const [isArticleError, setIsArticleError] = useState(false);
	const [isCommentError, setIsCommentError] = useState(false);

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
		setIsArticleError(false);
		getArticleById(article_id)
			.then(({ data }) => {
				setSingleArticle(() => {
					return data.article;
				});
			})
			.catch(() => {
				setIsArticleError(true);
			});
	}, [article_id, comment_count]);

	useEffect(() => {
		setIsCommentError(false);
		getCommentByArticleId(article_id)
			.then(({ data }) => {
				setComments(() => {
					return data.comments;
				});
			})
			.catch(() => {
				setIsCommentError(true);
			});
	}, [article_id, comment_count]);
	if (isArticleError) {
		return <h2>Something is wrong with this article....</h2>;
	}
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
			<ArticleVotes votes={Number(votes)} article_id={article_id} />
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
			{isCommentError ? (
				<h2>Something is wrong with the comment</h2>
			) : comment_count === 0 ? (
				<h2 className="text-2xl mb-20">There is no comment yet....</h2>
			) : (
				comments.map((comment) => {
					return <CommentCard key={comment.comment_id} comment={comment} />;
				})
			)}
		</div>
	);
}
