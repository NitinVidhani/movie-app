import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import BottomNav from "./components/BottomNav/BottomNav";
import Header from "./components/Header/Header";
import Movies from "./Pages/Movies/Movies";
import Search from "./Pages/Search/Search";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<div className="app">
					<Container>
						<Switch>
							<Route path="/" component={Trending} exact />
							<Route path="/movies" component={Movies} exact />
							<Route path="/series" component={Series} exact />
							<Route path="/search" component={Search} exact />
						</Switch>
					</Container>
				</div>
				<BottomNav />
			</BrowserRouter>
		</>
	);
}

export default App;
