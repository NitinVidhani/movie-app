import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SignleContent";
import "./Trending.css";

const Trending = () => {
	const [content, setContent] = useState([]);
	const [page, setPage] = useState(1);

	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
		);
		console.log(data.results);
		setContent(data.results);
	};

	useEffect(() => {
		fetchTrending();
		// eslint-disable-next-line
	}, [page]);

	return (
		<div className="trending">
			<div className="pageTitle">Trending</div>
			<div className="trending__data">
				{content &&
					content.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							mediaType={c.media_type}
							voteAverage={c.vote_average}
						/>
					))}
			</div>
			<div className="trending__pagination">
				<CustomPagination setPage={setPage} />
			</div>
		</div>
	);
};

export default Trending;
