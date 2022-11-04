import React, { useEffect, useState } from "react";
import InsomniaError from "./InsomniaError";
import InsomniaRoot from "./InsomniaRoot";

export default function App(): JSX.Element | null {

	// Initialize state
	const [ insomnia, setState ] = useState<Insomnia | null | false>(null);

	// On mount, fetch insomnia.json
	useEffect(function() {

		// Fetch insomnia.json
		fetch("/insomnia.json")
			.then(resp => resp.json())
			.then(setState)
			.catch(() => setState(false));

	}, []);

	if (insomnia === null) return null;
	if (insomnia === false) return <InsomniaError/>;
	return <InsomniaRoot insomnia={insomnia}/>;

}
