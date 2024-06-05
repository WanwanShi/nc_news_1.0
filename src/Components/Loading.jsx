import Lottie from "lottie-react";
import Loading_animation from "../assets/loading.json";
export default function Loading() {
	return (
		<>
			<h2>Almost there, we are trying to get the articles you want.....</h2>
			<Lottie
				animationData={Loading_animation}
				loop={true}
				id="loading-animation"
			/>
		</>
	);
}
