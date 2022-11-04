import React from "react";
import InsomniaHeader from "./InsomniaHeader";
import { Row, Col } from "photoncss/lib/react";
import InsomniaSidebar from "./InsomniaSidebar";
import { BrowserRouter, Route } from "react-router-dom";
import InsomniaDocs from "./InsomniaDocs";
import InsomniaHome from "./InsomniaHome";

export type Props = { insomnia: Insomnia };

export default function InsomniaRoot({ insomnia }: Props): JSX.Element {

	// Get collection root
	const collectionRoot = insomnia.resources.filter(resource => resource.parentId === null);

	const defaultHeader = {
		name: "Insomnia docs",
		description: "API documentation exported from Insomnia"
	} as InsomniaResource;

	return (
		<BrowserRouter>
			<InsomniaHeader insomnia={insomnia} collection={collectionRoot.length === 1 ? collectionRoot[0] : defaultHeader}/>
			<Row>
				<Col lg={3}>
					<InsomniaSidebar resources={insomnia.resources}/>
				</Col>
				<Col lg={9}>
					{ insomnia.resources.map((resource, key) => <InsomniaDocs resource={resource} insomnia={insomnia} key={key}/>) }
					<Route path="**/" exact>
						<InsomniaHome/>
					</Route>
				</Col>
			</Row>
		</BrowserRouter>
	);
}
