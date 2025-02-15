import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<BrowserRouter basename={process.env.REACT_APP_BASENAME || "/"}>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
