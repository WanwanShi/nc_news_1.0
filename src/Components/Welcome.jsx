import Lottie from "lottie-react";
import Welcome_animation from "../assets/Wecome_Animation - 1715077395917.json";
import { Link } from "react-router-dom";
export default function Welcome() {
	return (
		<div className="flex-col place-items-center ">
			<div className="size-80  mx-auto">
				<Lottie
					animationData={Welcome_animation}
					loop={false}
					id="no-data-animation"
				/>
			</div>
			<div className="mx-auto w-fit">
				<Link to="/news">
					<button className="text-5xl mx-auto nc-title welcome-btn my-1">
						Check news
					</button>
				</Link>
			</div>
		</div>
	);
}
