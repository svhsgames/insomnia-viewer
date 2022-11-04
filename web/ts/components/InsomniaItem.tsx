import React, { useEffect, useState } from "react";
import { ListItem } from "photoncss/lib/react";
import { Link } from "react-router-dom";
import InsomniaMethod from "./InsomniaMethod";
import classnames from "classnames";
import InsomniaPath from "./InsomniaPath";

export type Props = { resources: InsomniaResource[]; item: InsomniaResource };

export function getParents(item: InsomniaResource, resources: InsomniaResource[]): InsomniaResource[] {

	const parents = [];

	function getParent(resource: InsomniaResource): InsomniaResource | undefined {
		return resources.filter(parent => parent._id === resource.parentId)[0];
	}

	let parent = getParent(item);
	while (parent !== undefined) {
		parents.push(parent);
		parent = getParent(parent);
	}

	return parents.reverse();

}

export default function InsomniaItem({ resources, item }: Props): JSX.Element {

	const [ active, setState ] = useState(false);
	const shouldBeActive = (): boolean => location.pathname.includes(item._id);

	useEffect(function() {
		const iv = setInterval(function() {
			const state = shouldBeActive();
			if (active !== state) setState(state);
		});
		return (): void => clearInterval(iv);
	});

	const parents = [ ...getParents(item, resources), item ];
	if (resources.filter(resource => resource.parentId === null).length === 1) parents.shift();

	return (
		<Link to={`./${item._id}`}>
			<ListItem className={classnames("insomnia-item", "round", active && "active")}>
				<InsomniaMethod method={item.method} chars={3}/>
				<InsomniaPath parents={parents}/>
			</ListItem>
		</Link>
	);
}
