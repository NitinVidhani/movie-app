import { Badge } from "@material-ui/core";
import React from "react";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";

const SignleContent = ({ id, poster, title, date, mediaType, voteAverage }) => {
	return (
		<div className="singleContent">
			<Badge
				badgeContent={voteAverage}
				color={voteAverage > 6 ? "primary" : "secondary"}
			/>
			<img
				className="singleContent__poster"
				src={poster ? `${img_300}/${poster}` : unavailable}
				alt={title}
			/>
			<b className="singleContent__title">{title}</b>
			<div className="singleContent__info">
				<span>{mediaType === "tv" ? "TV Series" : "Movie"}</span>
				<span>{date}</span>
			</div>
		</div>
	);
};

export default SignleContent;
