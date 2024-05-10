import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

export default function CommentCard({
	comment,
	handleDelete,

	deletedCommentId,
}) {
	const { body, author, votes, comment_id } = comment;
	const { user } = useContext(UserContext);

	return (
		<>
			<div className="flex  my-2 border-solid border-black">
				<Avatar className="mx-2">{author[0].toUpperCase()}</Avatar>
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
				<p>{body}</p>
			</div>
			<Badge
				badgeContent={votes}
				color="success"
				className="text-yellow-800 badge-color mx-3 font-bold my-5 "
			>
				<button>
					<AiOutlineLike className="mx-2 size-8" />
				</button>
			</Badge>
		</>
	);
}
