import { useState } from "react";

import { IoSearch } from "react-icons/io5";
export default function Search({ setCurrentSearch }) {
	const [searchInput, setSearchInput] = useState("");
	const [open, setOpen] = useState(false);
	const handleSearchClick = () => {
		if (open) {
			setCurrentSearch(searchInput);
			setOpen(false);
		} else {
			setOpen(true);
		}
	};

	return (
		<div className="relative ">
			<button onClick={handleSearchClick} className="absolute right-0">
				<IoSearch size={32} />
			</button>
			<div className="w-4/5">
				{open && (
					<input
						className="search-input rounded-lg  "
						type="text"
						value={searchInput}
						placeholder="Search here ..."
						aria-label="Enter search term"
						onChange={(e) => {
							setSearchInput(e.target.value);
						}}
					/>
				)}
			</div>
		</div>
	);
}
