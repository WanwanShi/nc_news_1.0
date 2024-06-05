import { useParams } from "react-router-dom";
import {
	getArticleById,
	getCommentByArticleId,
	deleteCommentById,
} from "../../utils/api";
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import ArticleVotes from "./ArticleVotes";
import PostComment from "./PostComment";
import ErrorPage from "../ErrorPage";

export default function SingleArticle() {
	const { article_id } = useParams();
	const [singleArticle, setSingleArticle] = useState({});
	const [comments, setComments] = useState([]);
	const [isArticleError, setIsArticleError] = useState(false);
	const [isCommentError, setIsCommentError] = useState(false);
	const [newComment, setNewComment] = useState({});
	const [deletedCommentId, setDeletedCommentId] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = (comment_id) => {
		if (confirm("Are you sure you want to delete this comment?")) {
			setIsDeleting(true);
			setIsCommentError(false);
			deleteCommentById(comment_id)
				.then(() => {
					setIsDeleting(false);
					setDeletedCommentId(comment_id);
				})
				.catch(() => {
					setIsCommentError(true);
				});
		}
	};

	useEffect(() => {
		setIsCommentError(false);
		getCommentByArticleId(article_id)
			.then(({ data }) => {
				setComments(data.comments);
			})
			.catch(() => {
				setIsCommentError(true);
			});
	}, [article_id, newComment, deletedCommentId]);

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
	}, [article_id]);

	if (isArticleError) {
		return <ErrorPage />;
	}
	return (
		<div className="mx-4 ">
			<h2 className="title text-3xl font-bold my-3 mx-5">{title}</h2>
			<div className="flex">
				<h3 className="mx-5 italic">{author}</h3>
				<p className="ml-2">
					{new Date(Date.now()).getFullYear() -
						new Date(created_at).getFullYear()}{" "}
					years ago
				</p>
			</div>
			<img
				className="article-img my-3 mx-5 rounded-lg"
				src={article_img_url}
				alt={`image of article {title}`}
			/>
			<p className="mx-10 my-5 text-lg article-content first-letter:capitalize first-letter:font-bold first-letter:text-3xl">
				{body}
			</p>

			<ArticleVotes votes={Number(votes)} article_id={article_id} />

			<PostComment
				handleDelete={handleDelete}
				setNewComment={setNewComment}
				article_id={article_id}
				comment_count={comment_count}
			/>

			{isCommentError ? (
				<h2>Something is wrong with the comment</h2>
			) : comment_count === 0 ? (
				<h2 className="text-2xl mb-20">There is no comment yet....</h2>
			) : (
				comments.map((comment, index) => {
					return (
						<CommentCard
							key={comment.comment_id}
							comment={comment}
							handleDelete={handleDelete}
							isDeleting={isDeleting}
							deletedCommentId={deletedCommentId}
							index={index}
						/>
					);
				})
			)}
		</div>
	);
}
