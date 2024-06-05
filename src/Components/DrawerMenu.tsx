import React from "react";
import {
	Box,
	Drawer,
	List,
	ListItemText,
	IconButton,
	ListItem,
} from "@mui/material";

import { MdMenuOpen, MdOutlineMenuOpen } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
export default function TemporaryDrawer({ searchParams }) {
	const [open, setOpen] = useState(false);
	const [sortBy, setSortBy] = useState("created_at");
	const [order, setOrder] = useState("desc");
	const topicQuery = searchParams.get("topic");
	const navigate = useNavigate();

	const handleSort = (e) => {
		setSortBy(e.target.value);
		const url = topicQuery
			? `/news?topic=${topicQuery}&&sort_by=${e.target.value}&&order=${order}`
			: `/news?sort_by=${e.target.value}&&order=${order}`;
		navigate(url);
	};

	const handleOrder = (e) => {
		setOrder(e.target.value);
		const url = topicQuery
			? `/news?topic=${topicQuery}&&sort_by=${sortBy}&&order=${e.target.value}`
			: `/news?sort_by=${sortBy}&&order=${e.target.value}`;
		navigate(url);
	};
	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	return (
		<div className="bg-mainBg">
			<button onClick={toggleDrawer(true)} className="mt-3 mx-3">
				<MdMenuOpen size={50} />
			</button>

			<Drawer open={open} onClose={toggleDrawer(false)}>
				<div className="bg-mainBg">
					<Box sx={{ width: 250, height: "100vh" }} role="presentation">
						<div className="bg-mainBg text-textBlack mt-10">
							<List>
								<h3 className="text-2xl  mx-3">
									<FaFilter size={24} className="inline-block mr-2" />
									Filter
								</h3>
								<ListItem>
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
								</ListItem>
								<ListItem>
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
								</ListItem>
							</List>
						</div>
					</Box>
				</div>
			</Drawer>
		</div>
	);
}
