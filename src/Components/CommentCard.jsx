import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { brown } from "@mui/material/colors";

export default function CommentCard({ comment }) {
	const { body, author, votes } = comment;

	return (
		<>
			<div className="flex  my-2 border-solid border-black">
				<Avatar className="mx-2">{author[0].toUpperCase()}</Avatar>
				<p className="text-lg font-bold">{author}</p>
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
			<Badge
				badgeContent={votes}
				color="success"
				className="text-yellow-800 badge-color mx-3 font-bold my-5 "
			>
				<button>
					<AiOutlineDislike className="mx-2 size-8" />
				</button>
			</Badge>
		</>
	);
}
