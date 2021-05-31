import {
	Button,
	createMuiTheme,
	Tab,
	Tabs,
	TextField,
	ThemeProvider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SignleContent";

const Search = () => {
	const [type, setType] = useState(0);
	const [page, setPage] = useState(1);
	const [searchText, setSearchText] = useState("");
	const [content, setContent] = useState([]);
	const [numOfPages, setNumOfPages] = useState(0);

	const darkTheme = createMuiTheme({
		palette: {
			type: "dark",
			primary: {
				main: "#ffffff",
			},
		},
	});

	const fetchSearch = async () => {
		try {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/search/${
					type ? "tv" : "movie"
				}?api_key=${
					process.env.REACT_APP_API_KEY
				}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
			);
			setContent(data.results);
			setNumOfPages(data.total_pages);
			// console.log(data);
		} catch (error) {
			console.log("err");
			setContent([]);
			setNumOfPages(0);
		}
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchSearch();
		// eslint-disable-next-line
	}, [type, page]);

	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<div style={{ display: "flex", margin: "1rem" }}>
					<TextField
						style={{ flex: 1 }}
						label="Search"
						variant="filled"
						className="searchBox"
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<Button
						variant="contained"
						style={{ marginLeft: "0.75rem" }}
						onClick={fetchSearch}
					>
						<SearchIcon />
					</Button>
				</div>

				<Tabs
					value={type}
					indicatorColor="primary"
					textColor="primary"
					onChange={(event, newType) => {
						setType(newType);
						setPage(1);
					}}
				>
					<Tab style={{ width: "50%" }} label="Search Movies" />
					<Tab style={{ width: "50%" }} label="Search TV Series" />
				</Tabs>
			</ThemeProvider>
			<div className="trending__data">
				{content &&
					content.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							mediaType={type ? "tv" : "movie"}
							voteAverage={c.vote_average}
						/>
					))}
				{searchText &&
					content.length === 0 &&
					(type ? (
						<h2>No Series Found</h2>
					) : (
						<h2>No Movies Found</h2>
					))}
			</div>
			<div className="trending__pagination">
				<CustomPagination
					setPage={setPage}
					numOfPages={numOfPages > 1 ? numOfPages : 0}
				/>
			</div>
		</div>
	);
};

export default Search;
