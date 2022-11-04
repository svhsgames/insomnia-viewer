import React from "react";
import Photon from "photoncss";
import { Toolbar, ToolbarTitle, Icon, ToolbarActions } from "photoncss/lib/react";
import ThemeSwitcher from "./ThemeSwitcher";
import InsomniaSearch from "./InsomniaSearch";
import { InsomniaSearchToggle as SearchToggleButton } from "./SearchToggleButton";

export type Props = { insomnia: Insomnia; collection: InsomniaResource };

export default function InsomniaHeader({ collection, insomnia }: Props): JSX.Element {
	return (
		<>
			<Toolbar>
				<Icon className="only-small material-icons variant-normal waves-effect waves-ink" onClick={ (): void => Photon.Drawer(".insomnia-drawer").open() }>menu</Icon>
				<ToolbarTitle subtitle="Insomnia">{ collection.name }</ToolbarTitle>
				<InsomniaSearch insomnia={insomnia}/>
				<ToolbarActions>
					<SearchToggleButton/>
					<ThemeSwitcher/>
				</ToolbarActions>
			</Toolbar>
		</>
	);
}
