import React, { useState } from "react";
import { Icon } from "photoncss/lib/react";

export function InsomniaSearchToggle(): JSX.Element {

	const [ state, setState ] = useState(false);

	function toggle(): void {
		$(".insomnia-search").toggle();
		setState(!state);
	}

	return (
		<span className="only-small" style={{ zIndex: 5, position: "relative", marginRight: state ? -56 : 0 }}>
			<Icon onClick={toggle}>{state ? "close" : "search"}</Icon>
		</span>
	);
}
