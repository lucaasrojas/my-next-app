import Link from "next/link";
import React, { FC } from "react";

interface SideNavItemProps {
	name: string;
	href: string;
	currentPath: string;
	icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	show?: boolean
}

const SideNavItem: FC<SideNavItemProps> = ({
	name,
	href,
	currentPath,
	icon,
	show = true
}) => {
	const Icon = icon;
	return show && (
		<Link
			key={name}
			href={href}
			className={`flex gap-2 items-center bg-white hover:border-solid hover:border-b-2 hover:border-slate-300  p-2 rounded-lg ${
				currentPath === href ? "border-solid border-b-2 border-slate-300" : ""
			}`}
		>
			<Icon className="w-6" />
			<p>{name}</p>
		</Link>
	);
};

export default SideNavItem