/* eslint @typescript-eslint/no-var-requires: off */
import InsomniaSnippet from "./components/InsomniaSnippet";
import Photon from "photoncss";
import { Button, Dialog, DialogBody, DialogTitle, Snackbar } from "photoncss/lib/react";
import React from "react";

const app: App = {

	static: (asset: string): string => require(`../../static/${asset}`).default,
	getRoute: (): string => location.protocol === "file:" ? location.href.split("#")[1] || "/" : location.pathname,

	api(path: string, data = {}): Promise<unknown> {
		return new Promise(function(resolve, reject) {
			fetch(`/api/${path}`, {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: { "Content-Type": "application/json" },
				redirect: "follow",
				referrerPolicy: "no-referrer",
				body: JSON.stringify(data)
			})
			  .then(resp => resp.json())
			  .then(resolve)
			  .catch(reject);
		});
	},

	update(hash: string): void {
		async function click(): Promise<void> {
			const keys = await caches.keys();
			keys.map(async a => await caches.delete(a));
			location.reload();
		}

		Photon.Snackbar(
			<Snackbar>
				<p>An update is available. Build ID: <code>{hash}</code></p>
				<Button variant="flat" color="secondary" onClick={click}>update</Button>
			</Snackbar>
		);
	},

	generateSnippet(resource: InsomniaResource, insomnia: Insomnia): void {
		Photon.Dialog(
			<Dialog size="large">
				<DialogTitle seperated>Generated Snippet</DialogTitle>
				<DialogBody>
					<InsomniaSnippet resource={resource} insomnia={insomnia}/>
				</DialogBody>
			</Dialog>
		).open();
	}

};

export default app;
