import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		width: "100%",
		bottom: 0,
		position: "fixed",
		zIndex: 100,
		backgroundColor: "var(--primary-dark)",
		padding: "1rem 0",
	},
});

export default useStyles;
