import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<div className=" flex justify-around bg-color">
			<Link to="/news">
				<button className="btn-hl rounded-lg w-24  my-3 text-4xl p-1 ">
					Home
				</button>
			</Link>
			<Link to="/news/user">
				<button className="btn-hl rounded-3xl text-4xl"> + Post Article</button>
			</Link>
			<button className="btn-hl rounded-lg w-24 my-3 text-4xl p-1">Me</button>
		</div>
	);
}
