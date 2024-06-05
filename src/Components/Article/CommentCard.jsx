import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";
import { brown } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { updateCommentVoteById } from "../../utils/api";

export default function CommentCard({ comment, handleDelete, index }) {
	const { body, author, votes, comment_id } = comment;
	const { user } = useContext(UserContext);
	const nameTag = author[0].toUpperCase();
	const [voteChange, setVoteChange] = useState(0);

	const [userVoted, setUserVoted] = useState(false);

	const navigate = useNavigate();

	const handleLikeComment = () => {
		if (!user.username) {
			if (confirm("You need to login to vote")) {
				navigate("/news/users/login");
			}
		} else if (!user.vote) {
			if (voteChange === 0) {
				setVoteChange(1);
				const patchObj = {};
				patchObj.inc_votes = 1;
				updateCommentVoteById(comment_id, patchObj)
					.then(() => {
						setUserVoted(true);
					})
					.catch(() => {
						alert("Your vote is not successful");
						setVoteChange(0);
					});
			} else {
				setVoteChange(0);
				const patchObj = {};
				patchObj.inc_votes = -1;
				updateCommentVoteById(comment_id, patchObj)
					.then(() => {
						setUserVoted(false);
					})
					.catch(() => {
						alert("Your vote is not successful");
						setVoteChange(0);
					});
			}
		} else {
			alert("You have voted");
		}
	};

	return (
		<div
			className={
				index % 2 === 0
					? "bg-bgHighlight  mb-3 rounded-lg mx-4"
					: "mb-3 rounded-lg mx-4"
			}
		>
			<div className="flex  mt-2 border-solid border-black">
				<Avatar sx={{ bgcolor: brown[500] }} className="mx-2">
					{nameTag}
				</Avatar>
				<p className="text-lg font-bold">{author}</p>
				{user.username === author ? (
					<>
						<button
							onClick={() => handleDelete(comment_id)}
							className="text-lg bg-bgHighlight p-1 mx-3 rounded"
						>
							Delete
						</button>
					</>
				) : null}
			</div>

			<div>
				<p name="comment" className="comment-content mx-2 mt-1">
					{body}
				</p>
			</div>
			<Badge
				badgeContent={Number(votes + voteChange)}
				className="  mx-2 font-bold mb-3 mt-1"
			>
				<button aria-label="like this comment" onClick={handleLikeComment}>
					{!userVoted ? (
						<AiOutlineLike className="mx-1 size-6" />
					) : (
						<AiFillLike className="mx-1 size-6" />
					)}
				</button>
			</Badge>
		</div>
	);
}
