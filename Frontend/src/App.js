import { BrowserRouter } from "react-router-dom";
import "./App.css";
import HomeRoute from "./HomeRoute/HomeRoute";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<HomeRoute />
			</BrowserRouter>
		</div>
	);
}

export default App;
