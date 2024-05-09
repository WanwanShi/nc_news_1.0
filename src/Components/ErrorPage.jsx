import Lottie from "lottie-react";
import NoDataFound_Animation from "../assets/NoDataFound_Animation - 1714682242871.json";

export default function ErrorPage() {
	return (
		<div className="size-96 mx-auto">
			<h2 className="my-3 text-2xl">Oops, Something is wrong.....</h2>
			<div className="animation-container" id="no-data-animation-container">
				<Lottie
					animationData={NoDataFound_Animation}
					loop={true}
					id="no-data-animation"
				/>
			</div>
		</div>
	);
}
