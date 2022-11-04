/* eslint no-extra-parens: off */
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { getParents } from "./InsomniaItem";
import InsomniaMethod from "./InsomniaMethod";
import Markdown from "./Markdown";

export type Props = { resource: InsomniaResource; insomnia: Insomnia };

export function parseParams(resource: InsomniaResource, insomnia: Insomnia): InsomniaResource {

	const environments = insomnia.resources.filter(resource => resource._type === "environment").map(environment => environment.data);

	for (const key in resource) {
		let val = resource[key];
		if (typeof val !== "string") continue;
		environments.map(env => {
			for (const key in env) val = (val as string).replace(new RegExp(`{{\\s?${key}\\s?}}`, "gm"), env[key]);
		});
		resource[key] = val;
	}

	return resource;

}

export default function InsomniaDocs({ resource, insomnia }: Props): JSX.Element | null {

	const docsId = `docs_${resource._id}`;

	if (resource._type !== "request") return null;
	const parents = [ ...getParents(resource, insomnia.resources), resource ];

	const path = parents.map(request => request.name).join(" / ");

	function DocTitle(): null {
		useEffect(function() {
			document.title = `${path} • Insomnia`;
			const docs = $(`#${docsId}`);
			const toolbar = $(".photon-toolbar");

			let scrollCache = 0;
			const interval = setInterval(function() {
				const top = docs.scrollTop()!;
				if (scrollCache === top) return;
				scrollCache = top;
				if (top > 0) toolbar.addClass("variant-raised");
				else toolbar.removeClass("variant-raised");
			});

			return (): void => {
				clearInterval(interval);
				toolbar.removeClass("variant-raised");
			};
		});
		return null;
	}

	return (
		<Route path={`**/${resource._id}`}>
			<DocTitle/>
			<div className="insomnia-docs" id={docsId}>

				<h1 className="insomnia-docs-header">
					<InsomniaMethod method={resource.method} chars={10}/>
					{ parseParams(resource, insomnia).url }
				</h1>

				{ resource.description !== undefined ? <Markdown>{ parseParams(resource, insomnia).description }</Markdown> : null }

			</div>
		</Route>
	);
}
