import { List } from "photoncss/lib/react";
import React from "react";
import { Link } from "react-router-dom";
import Result from "./Result";

export type Props = { term: string; documents: InsomniaResource[]; insomnia: Insomnia };

export default function InsomniaResults({ documents, insomnia }: Props): JSX.Element {
	return (
		<List className="insomnia-search-results-list">
			{ documents.map((item, key) =>
				<Link key={key} to={`./${item._id}`}>
					<Result item={item} insomnia={insomnia}/>
				</Link>
			) }
		</List>
	);
}
