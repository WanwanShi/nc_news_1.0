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
