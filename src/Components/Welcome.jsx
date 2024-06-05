import Lottie from "lottie-react";
import Welcome_animation from "../assets/Welcome_Animation - 1715250039783.json";
import { Link } from "react-router-dom";
export default function Welcome() {
	return (
		<div className="flex-col place-items-center min-h-screen bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText">
			<div className="size-60  mx-auto mt-20">
				<Lottie
					animationData={Welcome_animation}
					loop={false}
					id="no-data-animation"
				/>
			</div>
			<div id="welcome" className="mx-auto w-fit h-fit">
				<Link to="/news">
					<button className="text-5xl mx-auto nc-title welcome-btn my-1 p-2 btn-hl rounded-full">
						{`What's New Today`}
					</button>
				</Link>
			</div>
		</div>
	);
}
