import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sort({ searchParams }) {
	const [sortBy, setSortBy] = useState("created_at");
	const [order, setOrder] = useState("desc");
	const navigate = useNavigate();
	const topicQuery = searchParams.get("topic");
	const handleSort = (e) => {
		setSortBy(e.target.value);
		if (topicQuery) {
			navigate(
				`/news?topic=${topicQuery}&&sort_by=${e.target.value}&&order=${order}`
			);
		} else {
			navigate(`/news?sort_by=${e.target.value}&&order=${order}`);
		}
	};
	const handleOrder = (e) => {
		setOrder(e.target.value);
		if (topicQuery) {
			navigate(
				`/news?topic=${topicQuery}&&sort_by=${sortBy}&&order=${e.target.value}`
			);
		} else {
			navigate(`/news?sort_by=${sortBy}&&order=${e.target.value}`);
		}
	};
	return (
		<>
			<div className="mx-4 text-lg w-40">
				<label htmlFor="sortBy">Sort By:</label>
				<select
					name="sort_by"
					id="sortBy"
					value={sortBy}
					onChange={handleSort}
					className="border-solid btn-hl border-2px mx-2 rounded-lg"
				>
					<option value="created_at">Date</option>
					<option value="title">Title</option>
					<option value="votes">Votes</option>
				</select>
			</div>
			<div className="mx-4 text-lg w-40">
				<label htmlFor="order"> Order:</label>
				<select
					className="border-solid btn-hl border-2px mx-2 rounded-lg"
					value={order}
					onChange={handleOrder}
					name="order"
					id="order"
				>
					<option value="desc">Decrease</option>
					<option value="asc">Increase</option>
				</select>
			</div>
		</>
	);
}
