/* eslint camelcase: off */
declare module "photoncss";
declare module "photoncss/lib/react";

declare module "classnames";
declare module "react-dom";
declare module "react-router-dom";

declare const PRODUCTION: boolean;

declare interface View {
	route: string;
	View: JSX.Element;
	default: JSX.Element;
	title?: string;
}

declare interface AppManifest {
	name: string;
    short_name: string;
	version: string;
	description: string;
	developerName: string;
	developerURL: string;
	background_color: string;
	theme_color: string;
	orientation: string;
	crossorigin: string;
	icons: {
		src: string;
		sizes: number[];
		purpose?: string;
		destination: string;
	}[];
}

declare const APP_MANIFEST: AppManifest;

declare interface App {
	static(asset: string): string;
	getRoute(): string;
	api(path: string, data = {}): Promise<unknown>;
	update(hash: string): void;
	generateSnippet(resource: InsomniaResource, insomnia: Insomnia): void;
}

declare interface InsomniaResource extends Record<string, unknown> {
    cookies: Cookie[];
    data: Record<string, string>;
	_id: string;
	parentId: string;
	modified: number;
	created: number;
	url: string;
	name: string;
	description: string;
	method: string;
	body: {
		mimeType: string;
		text: string;
	};
	parameters: {
		name: string;
		value: string;
		description: string;
		id: string;
		disabled: boolean;
	}[];
	headers: {
		name: string;
		value: string;
		id: string;
	}[];
	authentication: Record<string, unknown>;
	metaSortKey: number;
	isPrivate: boolean;
	settingStoreCookies: boolean;
	settingSendCookies: boolean;
	settingDisableRenderRequestBody: boolean;
	settingEncodeUrl: boolean;
	settingRebuildPath: boolean;
	settingFollowRedirects: string;
	_type: string;
}

declare interface Insomnia {
	_type: "export";
	__export_format: 4;
	__export_date: string;
	__export_source: string;
	resources: InsomniaResource[];
}
