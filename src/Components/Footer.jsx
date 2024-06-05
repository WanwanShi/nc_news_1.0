import {
	TiSocialGithub,
	TiSocialInstagram,
	TiSocialLinkedin,
	TiSocialTwitter,
} from "react-icons/ti";
export default function Footer() {
	return (
		<div className="">
			<div className="container bg-bgHighlight mx-auto my-10 p-6 rounded-md h-60 ">
				<h3 className="text-2xl font-bold mb-4 font-mono bg-transparent">
					GET FIRST UPDATE
				</h3>
				<p className="text-lg font-bold mb-3 bg-transparent">
					Subscribe 📨 to our newsletter to get the first update on our latest
					articles
				</p>
				<form className="flex flex-col bg-transparent w-120">
					<input
						type="email"
						placeholder="Enter your email"
						className="bg-input rounded-md p-2 mb-2 w-fit-content"
					/>
					<button
						type="submit"
						className="bg-strongHighlight font-bold rounded-md p-2 w-20 mx-auto text-textWhite"
					>
						Subscribe
					</button>
				</form>
			</div>
			<div>
				<p className="text-center text-md mb-4">
					Copyright © 2024 My Awesome Project. All rights reserved.
				</p>
				<p className="text-center text-md mb-4">
					Crafted with passion during the Northcoders Bootcamp.
				</p>
				<p className="text-center text-md mb-4">
					<a href="https://www.northcoders.com/">Northcoders</a> Alumni Project
				</p>
				<div className="flex justify-center mt-4 mb-5">
					<TiSocialInstagram color="bg-hl" className="mx-3 size-8" />
					<a target="_blank" href="https://www.linkedin.com/in/wanwanshi/">
						<TiSocialLinkedin color="bg-hl" className="mx-3 size-8" />
					</a>
					<TiSocialTwitter color="bg-hl" className="mx-3 size-8" />
					<a target="_blank" href="https://github.com/WanwanShi">
						<TiSocialGithub color="bg-hl" className="mx-3 size-8 " />
					</a>
				</div>
			</div>
		</div>
	);
}
