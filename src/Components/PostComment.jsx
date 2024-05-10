import { UserContext } from "../contexts/User";
import { useState, useContext } from "react";
import { AiOutlineComment } from "react-icons/ai";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { postCommentByArticleId } from "./api";
export default function PostComment({
	handleDelete,
	setNewComment,
	article_id,
	comment_count,
}) {
	const { user } = useContext(UserContext);
	const [commentBody, setCommentBody] = useState("");
	const [hideComment, setHideComment] = useState(true);
	const navigate = useNavigate();
	const toggleComment = () => {
		if (!user.username && confirm("You need to login to post a comment")) {
			navigate("/news/users/login");
		} else {
			setHideComment(!hideComment);
		}
	};

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		if (commentBody.length <= 20) {
			alert("Sorry, your comment need to be at least 20 characters");
		} else {
			const postObj = {};
			postObj.username = user.username;
			postObj.body = commentBody;
			postCommentByArticleId(article_id, postObj)
				.then(({ data }) => {
					setNewComment(data.comment[0]);
					setHideComment(true);
				})
				.catch(() => {
					alert(
						"Something is wrong here and your comment post is not successful"
					);
				});
		}
	};
	return (
		<>
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
			<p className="inline-block">Comments</p>
			<Badge
				badgeContent={comment_count}
				color="info"
				className="text-yellow-800 badge-color mx-3 font-bold"
			>
				<AiOutlineComment className="mx-2 size-8" />
			</Badge>
		</>
	);
}
