import React from "react";
import classnames from "classnames";

export type Props = { parents: InsomniaResource[] };

export default function InsomniaPath({ parents }: Props): JSX.Element {
	return (
		<>
			{
				parents
					.map((item, key) => {
						const isLast = key === parents.length - 1;
						return (): JSX.Element => <span className={classnames(isLast && "last")}>{item.name}</span>;
					})
					.map((Element, key) => <span key={key}>
						<Element/>
						{ key !== parents.length - 1 && <span className="seperator"> / </span> }
					</span>)
			}
		</>
	);
}
