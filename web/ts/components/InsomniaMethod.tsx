import React from "react";
import classnames from "classnames";

export type Props = { method: string; chars: number };

export default function InsomniaMethod({ method, chars = 10 }: Props): JSX.Element {
	return (
		<div className={classnames("insomnia-method", `insomnia-${method}`)}>{method.substr(0, chars)}</div>
	);
}
