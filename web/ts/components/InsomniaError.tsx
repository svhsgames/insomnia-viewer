import React from "react";
import { Container, TextIcon } from "photoncss/lib/react";

export default function InsomniaError(): JSX.Element | null {
	document.title = "Documentation not found!";
	return (
		<div className="insomnia-error">
			<Container>
				<TextIcon>warning</TextIcon>
				<h1>Documentation not found!</h1>
				<p>It looks like it's not possible to retrieve the contents of the API documentation at the moment. If you're the owner of this site, make sure that your <a href="/insomnia.json">Insomnia JSON file</a> is accessible.</p>
				<p>The developer console of your browser (network tab) might have more things to say about this error.</p>
			</Container>
		</div>
	);
}
