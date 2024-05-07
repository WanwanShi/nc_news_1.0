import { useState } from "react";
import search from "../assets/search.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

export default function Header({ setCurrentSearch, setSearchParams }) {
	const [searchInput, setSearchInput] = useState("");
	const [btnSwitch, setBtnSwitch] = useState([1, 0, 0, 0, 0]);
	const btnSwitchVal = {
		all: [1, 0, 0, 0, 0],
		football: [0, 1, 0, 0, 0],
		cooking: [0, 0, 1, 0, 0],
		coding: [0, 0, 0, 1, 0],
		music: [0, 0, 0, 0, 1],
	};
	const handleSearchClick = () => {
		setCurrentSearch(searchInput);
	};

	const handleTopicSearch = (e) => {
		const btnValue = e.target.value;

		const newParams = new URLSearchParams("topic");
		newParams.set("topic", btnValue);
		if (btnValue === newParams.get("topic")) {
			setBtnSwitch(btnSwitchVal[btnValue]);
		} else {
			setBtnSwitch([1, 0, 0, 0, 0]);
		}
		setSearchParams(newParams);
	};

	return (
		<>
			<div className="row-span-1">
				<h1 className="nc-title text-5xl">NC NEWS</h1>
				<div className="absolute right-0 top-0 inline-flex h-10 w-8/9">
					<input
						className="search-input bg-hl rounded-full p-2 mt-3 w-1/10"
						type="text"
						value={searchInput}
						placeholder="topic author"
						onChange={(e) => {
							setSearchInput(e.target.value);
						}}
					/>
					<button onClick={handleSearchClick}>
						<Lottie
							className="search-ani h-12"
							animationData={search}
							loop={false}
						/>
					</button>
				</div>
			</div>

			<div className="bg-hl row-span-1 grid-cols-6 h-full justify-around content-center">
				<Link to="/news">
					<button
						className={
							btnSwitch[0] === 1
								? "rounded-lg  mx-4 border-solid btn-hl text-lg p-1"
								: "rounded-lg  mx-4 border-solid  text-lg p-1"
						}
						value="all"
						onClick={handleTopicSearch}
					>
						All news
					</button>
				</Link>

				{/* need to refactor the button card later on */}
				<Link to="/news?topic=football">
					<button
						className={
							btnSwitch[1] === 1
								? "rounded-lg  mx-4 border-solid btn-hl text-lg p-1"
								: "rounded-lg  mx-4 border-solid text-lg p-1"
						}
						value="football"
						onClick={handleTopicSearch}
					>
						Football
					</button>
				</Link>
				<Link to="/news?topic=cooking">
					<button
						className={
							btnSwitch[2] === 1
								? "rounded-lg  mx-4 border-solid btn-hl text-lg p-1"
								: "rounded-lg  mx-4 border-solid text-lg p-1"
						}
						value="cooking"
						onClick={handleTopicSearch}
					>
						Cooking
					</button>
				</Link>
				<Link to="/news?topic=coding">
					<button
						className={
							btnSwitch[3] === 1
								? "rounded-lg  mx-4 border-solid btn-hl text-lg p-1"
								: "rounded-lg  mx-4 border-solid text-lg p-1"
						}
						value="coding"
						onClick={handleTopicSearch}
					>
						Coding
					</button>
				</Link>
				<Link to="/news?topic=music">
					<button
						className={
							btnSwitch[4] === 1
								? "rounded-lg  mx-4 border-solid btn-hl text-lg p-1"
								: "rounded-lg  mx-4 border-solid text-lg p-1"
						}
						value="music"
						onClick={handleTopicSearch}
					>
						Music
					</button>
				</Link>
			</div>
		</>
	);
}
