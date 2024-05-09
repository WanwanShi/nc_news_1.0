import { useNavigate, useParams } from "react-router-dom";
import {
	deleteCommentById,
	getArticleById,
	getCommentByArticleId,
	postCommentByArticleId,
} from "./api";
import { useState, useEffect, useContext } from "react";
import { AiOutlineComment } from "react-icons/ai";
import CommentCard from "./CommentCard";
import Badge from "@mui/material/Badge";
import ArticleVotes from "./ArticleVotes";
import { UserContext } from "../contexts/User";
import Lottie from "lottie-react";
import NoDataFound_Animation from "../assets/NoDataFound_Animation - 1714682242871.json";

export default function SingleArticle() {
	const { article_id } = useParams();
	const [singleArticle, setSingleArticle] = useState({});
	const [comments, setComments] = useState([]);
	const [isArticleError, setIsArticleError] = useState(false);
	const [isCommentError, setIsCommentError] = useState(false);
	const [commentBody, setCommentBody] = useState("");
	const [hideComment, setHideComment] = useState(true);
	const [newComment, setNewComment] = useState({});
	const [deletedCommentId, setDeletedCommentId] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [isPosting, setIsPosting] = useState(false);
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const toggleComment = () => {
		if (hideComment && !user.username) {
			if (
				confirm(
					"You need to login to comment on this article, do you want to login now?"
				)
			) {
				navigate("/news/users/login");
			}
		} else {
			setHideComment(!hideComment);
		}
	};
	const handleCommentSubmit = (e) => {
		e.preventDefault();
		if (commentBody.length <= 20) {
			alert("Sorry, your comment need to be at least 20 characters");
		} else {
			if (confirm("Do you want to post this  comment?", commentBody)) {
				setIsPosting(true);
				const postObj = {};
				postObj.username = user.username;
				postObj.body = commentBody;
				postCommentByArticleId(article_id, postObj)
					.then(({ data }) => {
						setIsPosting(false);
						setNewComment(data.comment[0]);
						alert("Your comment has been posted successfully");
					})
					.catch(() => {
						alert(
							"Something is wrong here and your comment post is not successful"
						);
					});
			}
		}
	};
	const {
		title,
		author,
		created_at,
		votes,
		article_img_url,
		comment_count,
		body,
	} = singleArticle;

	const handleDelete = (comment_id) => {
		if (confirm("Are you sure you want to delete this comment?")) {
			setIsDeleting(true);
			deleteCommentById(comment_id)
				.then(() => {
					setIsDeleting(false);
					setDeletedCommentId(comment_id);
					alert("Your comment has been deleted");
				})
				.catch(() => {
					alert("Something is wrong and your delete was not successful");
				});
		}
	};
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
	}, [article_id, comment_count, commentBody]);

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
	}, [article_id, commentBody, newComment, deletedCommentId]);

	if (isArticleError) {
		return (
			<div className="size-96 mx-auto">
				<h2 className="my-3 text-2xl">Oops, it seems there is no articles</h2>
				<div className="animation-container" id="no-data-animation-container">
					<Lottie
						animationData={NoDataFound_Animation}
						loop={true}
						id="no-data-animation"
					/>
				</div>
			</div>
		);
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

			<button
				className="my-3 btn-hl rounded-full block text-2xl p-2 "
				onClick={toggleComment}
			>
				{" "}
				+ Post new comment
			</button>
			<div
				className={
					hideComment
						? "rounded-lg  w-full border-black border-1 border-solid m-3 hidden"
						: "rounded-lg  w-full border-black border-1 border-solid m-3"
				}
			>
				<form onSubmit={handleCommentSubmit}>
					<input
						type="text"
						placeholder="Leave your comment here"
						className="rounded-lg h-20 w-full border-black border-3 border-solid bg-orange-100 text-start"
						value={commentBody}
						onChange={(e) => {
							setCommentBody(e.target.value);
						}}
					/>
					<button className="my-5 rounded-lg text-2xl btn-hl p-2">
						Submit
					</button>
				</form>
			</div>
			{isPosting && <span>Trying so hard to posting, be patient</span>}
			<p className="inline-block">Comments</p>
			<Badge
				badgeContent={comment_count}
				color="info"
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
					return (
						<CommentCard
							key={comment.comment_id}
							comment={comment}
							handleDelete={handleDelete}
							isDeleting={isDeleting}
							deletedCommentId={deletedCommentId}
						/>
					);
				})
			)}
		</div>
	);
}
