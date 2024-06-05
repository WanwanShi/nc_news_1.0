import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Badge from "@mui/material/Badge";
import { useContext, useState } from "react";
import { updateArticleVotesById } from "../../utils/api";
import { UserContext } from "../../contexts/User";
import { useNavigate } from "react-router-dom";

export default function ArticleVotes({ votes, article_id }) {
	const [voteChange, setVoteChange] = useState(0);
	const { user } = useContext(UserContext);

	const [userVoted, setUserVoted] = useState(false);

	const navigate = useNavigate();
	const handleVotesChange = () => {
		if (!user.username) {
			if (confirm("You need to login to vote")) {
				navigate("/news/users/login");
			}
		} else if (!user.vote) {
			if (voteChange === 0) {
				setVoteChange(1);
				const patchObj = {};
				patchObj.inc_votes = 1;
				updateArticleVotesById(article_id, patchObj)
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
				updateArticleVotesById(article_id, patchObj)
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
		<div className="ml-2">
			<Badge
				badgeContent={Number(votes + voteChange)}
				className="  mx-3 font-bold block "
			>
				<button
					aria-label="like this article"
					value="up"
					onClick={() => {
						handleVotesChange(1);
					}}
				>
					{!userVoted ? (
						<AiOutlineLike className="mx-2 size-8" />
					) : (
						<AiFillLike className="mx-2 size-8" />
					)}
				</button>
			</Badge>
		</div>
	);
}
