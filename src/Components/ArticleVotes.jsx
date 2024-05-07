import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import { updateArticleVotesById } from "./api";

export default function ArticleVotes({ votes, article_id }) {
	const [voteChange, setVoteChange] = useState(0);

	const handleVotesChange = (vote) => {
		updateArticleVotesById(article_id, Number(vote))
			.then(() => {
				setVoteChange(vote);
			})
			.catch(() => {});
	};

	return (
		<>
			<Badge
				badgeContent={Number(votes) + voteChange}
				color="success"
				className="text-yellow-800 badge-color mx-3 font-bold block"
			>
				<button onClick={() => handleVotesChange(1)}>
					<AiOutlineLike className="mx-2 size-8" />
				</button>
				<button onClick={() => handleVotesChange(-1)}>
					<AiOutlineDislike className="mx-2 size-8" />
				</button>
			</Badge>
		</>
	);
}
