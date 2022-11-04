import React from "react";
import { Card } from "photoncss/lib/react";
import InsomniaResults from "./InsomniaResults";

export type Props = { term: string; insomnia: Insomnia };

export default function SearchResult({ term, insomnia }: Props): JSX.Element {

	// Filter documents
	const documents = insomnia.resources
		.filter(item => item._type === "request")
		.filter(item => item.description.toLowerCase().includes(term.toLowerCase()));

	return (
		<div className="insomnia-search-results raised-12" style={{ display: "none", borderRadius: 4 }}>
			<Card style={{ margin: 0, marginTop: -76 }} variant="outlined">
				<div style={{ height: 48 }}></div>
				<p style={{ textAlign: "right", paddingTop: 12 }}>
					<span className="badge">{documents.length} result{documents.length !== 1 && "s"}</span>
				</p>
				<InsomniaResults term={term} documents={documents} insomnia={insomnia}/>
			</Card>
		</div>
	);
}
