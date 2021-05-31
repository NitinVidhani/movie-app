import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SignleContent";
import Genres from "../../components/Genres/Genres";
import useGenres from "../../hooks/useGenres";
import "./Movies.css";

const Movies = () => {
	const [page, setPage] = useState(1);
	const [content, setContent] = useState([]);
	const [numOfPages, setNumOfPages] = useState();
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [genres, setGenres] = useState([]);

	const genreforUrl = useGenres(selectedGenres);

	const fetchMovies = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforUrl}`
		);
		console.log(data);
		setNumOfPages(data.total_pages);
		setContent(data.results);
	};

	useEffect(() => {
		fetchMovies();
		// eslint-disable-next-line
	}, [page, genreforUrl]);

	return (
		<div>
			<div className="pageTitle">Movies</div>
			<Genres
				type="movie"
				selectedGenres={selectedGenres}
				genres={genres}
				setGenres={setGenres}
				setSelectedGenres={setSelectedGenres}
				setPage={setPage}
			/>
			<div className="movies__data">
				{content &&
					content.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							mediaType="movie"
							voteAverage={c.vote_average}
						/>
					))}
			</div>
			<div className="movies__pagination">
				<CustomPagination
					setPage={setPage}
					numOfPages={numOfPages > 1 ? numOfPages : 0}
				/>
			</div>
		</div>
	);
};

export default Movies;
