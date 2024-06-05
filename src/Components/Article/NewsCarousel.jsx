import { useState } from "react";

import { Carousel } from "react-bootstrap";
import TitleHighlight from "./TitleHighlight";

const topicColors = {
	coding: "#4682B4",
	football: "#1f931f",
	cooking: "#FFA07A",
};

function CarouselImage({ article }) {
	return (
		<div className="relative ">
			<img
				src={article.article_img_url}
				alt={article.title}
				className="rounded-lg"
			/>
			<span
				className={`absolute top-2 left-2 p-1 text-black rounded-md text-transformed capitalize
				}`}
				style={{ backgroundColor: topicColors[article.topic] }}
			>
				{article.topic}
			</span>
		</div>
	);
}

function ControlledCarousel({ articles }) {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	return (
		<div className="text-mainText mt-5">
			<TitleHighlight title="Top Headlines" bgColor="strongHighlight" />
			<Carousel activeIndex={index} onSelect={handleSelect} className="mt-4">
				{articles.map((article, index) => (
					<Carousel.Item key={index} interval={4000}>
						<CarouselImage article={article} />
						<Carousel.Caption>
							<div className="bg-opacity-30 bg-mainBg text-2xl  text-mainText font-bold  p-1 rounded h-30 w-full">
								<h3 className="title font-extrabold ">{article.title}</h3>
								<p className="text-sm ">
									{article.author} -{" "}
									{new Date(article.created_at).toLocaleDateString()}
								</p>
							</div>
						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel>
		</div>
	);
}

export default ControlledCarousel;
