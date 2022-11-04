import React from "react";
import { getParents } from "./InsomniaItem";
import InsomniaMethod from "./InsomniaMethod";
import { ListItem } from "photoncss/lib/react";
import InsomniaPath from "./InsomniaPath";
import strip from "remove-markdown";

export type Props = { item: InsomniaResource; insomnia: Insomnia };

export default function Result({ item, insomnia }: Props): JSX.Element {

	const { resources } = insomnia;

	const parents = [ ...getParents(item, resources), item ];
	if (resources.filter(resource => resource.parentId === null).length === 1) parents.shift();

	return (
		<ListItem className="insomnia-item insomnia-search-result-tag">
			<InsomniaMethod method={item.method} chars={3}/>
			<InsomniaPath parents={parents}/>
			<div className="description">
				{ strip(item.description) }
			</div>
		</ListItem>
	);
}
