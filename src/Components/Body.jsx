import { TiThMenu } from "react-icons/ti";
import ArticlesList from "./ArticlesList";
import { useState } from "react";
import Sort from "./Sort";
export default function Body({ currentSearch, searchParams }) {
	const [isMenuHidden, setIsMenuHidden] = useState(true);

	const menuClick = () => {
		setIsMenuHidden(!isMenuHidden);
	};
	return (
		<>
			<button className="bg-hl sticky " onClick={menuClick}>
				<TiThMenu
					className={isMenuHidden ? "size-8 mt-2" : "size-8 mt-2 btn-hl"}
				/>
			</button>
			<div
				className={
					isMenuHidden
						? "border-4 border-black h-24 hidden"
						: "border-4 border-black h-24"
				}
			>
				<Sort searchParams={searchParams} />
			</div>
			<ArticlesList currentSearch={currentSearch} searchParams={searchParams} />
		</>
	);
}
