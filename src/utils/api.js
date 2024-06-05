import axios from "axios";

export default function getArticles(
	topicQuery,
	sortByQuery,
	orderQuery,
	limit,
	p
) {
	let path = `https://back-end-project-clnr.onrender.com/api/articles?limit=${limit}&&p=${p}`;
	if (topicQuery) {
		path += `&&topic=${topicQuery}`;
	}
	if (!topicQuery && sortByQuery && orderQuery) {
		path += `&&sort_by=${sortByQuery}&&order=${orderQuery}`;
	} else if (sortByQuery && orderQuery) {
		path += `&&sort_by=${sortByQuery}&&order=${orderQuery}`;
	}

	return axios.get(path);
}
export function getTopics() {
	return axios.get(`https://back-end-project-clnr.onrender.com/api/topics`);
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
export async function groupArticlesByUser() {
	const { data } = await axios.get(
		`https://back-end-project-clnr.onrender.com/api/articles`
	);
	const articles = data.articles;
	const {
		data: { users },
	} = await getUsers();
	const articlesByAuthor = articles.reduce((acc, article) => {
		const author = article.author;
		const user = users.find((user) => user.username === author);
		if (!acc[author]) {
			acc[author] = {
				...user,
				totalArticles: 0,
			};
		}
		acc[author].totalArticles += 1;

		return acc;
	}, {});

	const sortedArticlesByAuthor = Object.values(articlesByAuthor).sort(
		(a, b) => b.totalArticles - a.totalArticles
	);
	return sortedArticlesByAuthor;
}

export function updateCommentVoteById(comment_id, patchObj) {
	return axios.patch(
		`https://back-end-project-clnr.onrender.com/api/comments/${comment_id}`,
		patchObj
	);
}
