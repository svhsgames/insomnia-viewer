import { Drawer, List } from "photoncss/lib/react";
import React, { useEffect, useState } from "react";
import InsomniaItem from "./InsomniaItem";
import Photon from "photoncss";
import { Link } from "react-router-dom";
import { ListItem } from "photoncss/lib/react";
import classnames from "classnames";
import { TextIcon } from "photoncss/lib/react";

export type Props = { resources: InsomniaResource[] };

export default function InsomniaSidebar({ resources }: Props): JSX.Element {

	useEffect(function() {
		const interval = setInterval(function() {
			if (window.innerWidth > 1280 && $(".modal-close-area").hasClass("active")) Photon.Drawer(".insomnia-drawer").close();
		});
		return function(): void {
			clearInterval(interval);
		};
	});

	const item = (item: InsomniaResource, key: number): JSX.Element =>
		<InsomniaItem item={item} key={key} resources={resources}/>;

	function ListContents() {
		const [ active, setState ] = useState(false);
		const shouldBeActive = (): boolean => location.pathname.endsWith("/");

		useEffect(function() {
			const iv = setInterval(function() {
				const state = shouldBeActive();
				if (active !== state) setState(state);
			});
			return (): void => clearInterval(iv);
		});

		return (
			<>
				<Link to={"./"}>
					<ListItem className={classnames("insomnia-item", "round", active && "active")} icon={<TextIcon style={{ padding: "0 9px" }}>description</TextIcon>}>README.md</ListItem>
				</Link>
				<hr />
				{ resources.filter(resource => resource._type === "request").map(item) }
			</>
		);
	}

	return (
		<>
			<List className="insomnia-sidebar only-large">
				<ListContents/>
			</List>
			<Drawer from="left" className="insomnia-drawer">
				<ListContents/>
			</Drawer>
		</>
	);
}
