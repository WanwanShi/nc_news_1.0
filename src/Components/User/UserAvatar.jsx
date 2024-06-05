export default function UserAvatar({ user }) {
	return (
		<div className=" mt-2 mx-8 col-span-2">
			<h2>
				<section className="username flex ">
					<img
						className="object-cover rounded-full h-6 w-6 flex-inline mr-4"
						alt={`${user.username}'s avatar`}
						src={user.avatar_url}
					/>
					<div>
						<p className="text-md font-bold block">{user.username}</p>
						<p className="text-xs  block"> {user.totalArticles} articles</p>
					</div>
				</section>
			</h2>
		</div>
	);
}
