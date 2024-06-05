export function getUniqueNews(allArticles) {
	const topicsSeen = new Set();
	return allArticles.filter((article) => {
		if (!topicsSeen.has(article.topic)) {
			topicsSeen.add(article.topic);
			return true;
		}
		return false;
	});
}
