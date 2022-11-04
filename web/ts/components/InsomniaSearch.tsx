/* eslint no-extra-parens: off */
/* eslint no-invalid-this: off */
import React, { useEffect, useState } from "react";
import { InputField } from "photoncss/lib/react";
import SearchResults from "./SearchResults";

export type Props = { insomnia: Insomnia };

export default function InsomniaSearch({ insomnia }: Props): JSX.Element {
	const [ term, setTerm ] = useState("");

	setImmediate(function() {

		if (term === "") {
			$(".insomnia-search-results").hide();
		} else {
			$(".insomnia-search-results").show();
		}

		$(document).on("click", function(event) {
			const { target } = event;
			if ($(target).hasClass("insomnia-search-results")) return;
			if ($(target).parents()
				.hasClass("insomnia-search-results")) return;
			if ($(target).hasClass("insomnia-search")) return;
			if ($(target).parents()
				.hasClass("insomnia-search")) return;
			$(".insomnia-search-results").hide();
		});

		$(".insomnia-search")
			.children(".photon-input")
			.children("input")
			.on("focus", function() {
				if ($(this).val() === "") return;
				$(".insomnia-search-results").show();
			});

	});

	useEffect(function() {
		$(document).on("keypress", function (event) {
			if (event.shiftKey) return;
			const search = $(".insomnia-search")
				.children(".photon-input")
				.children("input");
			if (search.is(":focus")) return;
			event.preventDefault();

			if (event.key !== "k") return;
			const toggler = $(".photon-toolbaractions")
				.children(".only-small")
				.children(".material-icons");
			if (toggler.text() === "search") toggler.trigger("click");
			search
				.trigger("focus")
				.parent()
				.trigger("click");
		});
	}, []);

	return (
		<div className="insomnia-search">
			<InputField prefix="search" type="text" variant="filled" placeholder="Press 'K' to search" onChange={ (event: InputEvent): void => setTerm((event.target as HTMLInputElement).value)}/>
			<SearchResults term={term} insomnia={insomnia}/>
		</div>
	);
}
