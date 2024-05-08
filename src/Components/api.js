import axios from "axios";

export default function getArticles(topicQuery) {
	if (topicQuery) {
		return axios.get(
			`https://back-end-project-clnr.onrender.com/api/articles?topic=${topicQuery}`
		);
	}
	return axios.get("https://back-end-project-clnr.onrender.com/api/articles");
}

export function getUsers() {
	return axios.get(`https://back-end-project-clnr.onrender.com/api/users`);
}
export function getUserByUsername(username) {
	return axios.get(
		`https://back-end-project-clnr.onrender.com/api/users/${username}`
	);
}
export function getArticleById(article_id) {
	return axios.get(
		`https://back-end-project-clnr.onrender.com/api/articles/${article_id}`
	);
}

export function getCommentByArticleId(article_id) {
	return axios.get(
		`https://back-end-project-clnr.onrender.com/api/articles/${article_id}/comments`
	);
}

export function updateArticleVotesById(article_id, voteObj) {
	return axios.patch(
		`https://back-end-project-clnr.onrender.com/api/articles/${article_id}`,
		voteObj
	);
}

export function postCommentByArticleId(article_id, patchObj) {
	return axios.post(
		`https://back-end-project-clnr.onrender.com/api/articles/${article_id}/comments`,
		patchObj
	);
}
export function deleteCommentById(commentId) {
	return axios.delete(
		`https://back-end-project-clnr.onrender.com/api/comments/${commentId}`
	);
}
