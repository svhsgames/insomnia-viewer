import React, { useEffect, useState } from "react";
import { TextIcon } from "photoncss/lib/react";
import Markdown from "./Markdown";

export default function InsomniaItem(): JSX.Element | null {

	const [ readme, setReadMe ] = useState<null | false | string>(null);

	useEffect(function() {

		const readme = fetch("/README.md")
			.then(async res => {
				if (res.status !== 404) {
					setReadMe(await res.text());
					document.title = "README • Insomnia";
					return;
				}
				return setReadMe(false);
			});

	}, []);

	if (readme === null || readme === false) return (
		<div style={{ textAlign: "center", padding: "35vh 0" }}>
			<h1>
				<TextIcon style={{
					fontSize: 128,
					height: 128,
					width: 128,
					userSelect: "none",
					opacity: 0.34
				}} variant="round">description</TextIcon>
			</h1>

			<br/>

			<h2>Select any request to view documentation.</h2>
		</div>
	);

	return (
		<div className="insomnia-docs">
			<Markdown>{ readme }</Markdown>
		</div>
	);
}
