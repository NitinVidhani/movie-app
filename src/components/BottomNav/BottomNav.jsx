import React, { useEffect } from "react";
import useStyles from "../../styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MovieIcon from "@material-ui/icons/Movie";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import SearchIcon from "@material-ui/icons/Search";
import "./BottomNav.css";
import { useHistory } from "react-router";

export default function BottomNav() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const history = useHistory();

	useEffect(() => {
		if (value === 0) {
			history.push("/");
		} else if (value === 1) {
			history.push("/movies");
		} else if (value === 2) {
			history.push("/series");
		} else if (value === 3) {
			history.push("/search");
		}
	}, [value, history]);

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			showLabels
			className={classes.root}
		>
			<BottomNavigationAction
				style={{ color: "var(--pure)" }}
				label="Trending"
				icon={<WhatshotIcon />}
			/>
			<BottomNavigationAction
				style={{ color: "var(--pure)" }}
				label="Movies"
				icon={<MovieIcon />}
			/>
			<BottomNavigationAction
				style={{ color: "var(--pure)" }}
				label="TV Series"
				icon={<LiveTvIcon />}
			/>
			<BottomNavigationAction
				style={{ color: "var(--pure)" }}
				label="Search"
				icon={<SearchIcon />}
			/>
		</BottomNavigation>
	);
}
