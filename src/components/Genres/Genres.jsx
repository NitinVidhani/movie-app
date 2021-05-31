import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
	type,
	selectedGenres,
	genres,
	setGenres,
	setSelectedGenres,
	setPage,
}) => {
	const fetchGenres = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		console.log(data.genres);
		setGenres(data.genres);
	};
	useEffect(() => {
		fetchGenres();

		return () => {
			setGenres([]);
		};
		// eslint-disable-next-line
	}, []);

	const handleAdd = (genre) => {
		setSelectedGenres([...selectedGenres, genre]);
		setGenres(genres.filter((g) => genre.id !== g.id));
		setPage(1);
	};

	const handleRemove = (genre) => {
		setGenres([...genres, genre]);
		setSelectedGenres(selectedGenres.filter((g) => genre.id !== g.id));
		setPage(1);
	};

	return (
		<div style={{ padding: "0.75rem 0" }}>
			{selectedGenres.map((genre) => {
				return (
					<Chip
						label={genre.name}
						style={{ margin: "0.3rem" }}
						size="small"
						key={genre.id}
						onDelete={() => handleRemove(genre)}
						color="primary"
						clickable
					/>
				);
			})}
			{genres.map((genre) => {
				return (
					<Chip
						label={genre.name}
						style={{ margin: "0.3rem" }}
						size="small"
						key={genre.id}
						onClick={() => handleAdd(genre)}
						clickable
					/>
				);
			})}
		</div>
	);
};

export default Genres;
