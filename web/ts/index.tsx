import App from "./components/App";
import "photoncss/dist/photon.css";
import React from "react";
import { render } from "react-dom";
import "script-loader!jquery";
import "../../styles/main.less";
import ErrorBoundry from "./runtime/ErrorBoundry";
import PWAInstaller from "pwa-installer-react";

import "./runtime/util/offlineInstaller";

// Wait for the DOM to load before rendering
document.addEventListener("DOMContentLoaded", function() {

	// Append a container to the DOM to render content into
	const root = document.createElement("DIV");
	root.id = "root";
	document.body.append(root);

	// Render root component into react-root container
	render(
		<ErrorBoundry>
			<App/>
			<PWAInstaller/>
		</ErrorBoundry>,
		document.getElementById("root"));

});
