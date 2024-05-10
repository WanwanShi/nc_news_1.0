import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { brown } from "@mui/material/colors";

export default function CommentCard({
	comment,
	handleDelete,

	deletedCommentId,
}) {
	const { body, author, votes, comment_id } = comment;
	const { user } = useContext(UserContext);
	const nameTag = author[0].toUpperCase();
	return (
		<>
			<div className="flex  my-2 border-solid border-black">
				<Avatar sx={{ bgcolor: brown[500] }} className="mx-2">
					{nameTag}
				</Avatar>
				<p className="text-lg font-bold">{author}</p>
				{user.username === author ? (
					<>
						<button
							onClick={() => handleDelete(comment_id)}
							className="text-xl btn-hl p-1 mx-3 rounded"
						>
							Delete
						</button>
					</>
				) : null}
			</div>

			<div>
				<p name="comment" className="comment-content">
					{body}
				</p>
			</div>
			<Badge
				badgeContent={votes}
				color="success"
				className="text-yellow-800 badge-color mx-3 font-bold my-5 "
			>
				<button aria-label="like this comment">
					<AiOutlineLike className="mx-2 size-8" />
				</button>
			</Badge>
		</>
	);
}
