"use client";
import Link from "next/link";
import { HomeIcon, KeyIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const links = [
	{ name: "Home", href: "/", icon: HomeIcon },
	{ name: "Login", href: "/login", icon: KeyIcon },
];

export default function Sidenav() {
    const path = usePathname()
    console.log('PATH', path)
	return (
		<div className="flex w-full bg-sky-50 p-4">
			<div className="flex grow flex-row md:flex-col gap-2 ">
				{links.map((link) => {
					const LinkIcon = link.icon;
					return (
						<Link
							key={link.name}
							href={link.href}
							className={
								`flex gap-2 items-center bg-white hover:bg-sky-300 border-solid border-2 border-sky-300 p-2 rounded-lg ${path === link.href ? "bg-sky-300" : ""}`
							}
						>
							<LinkIcon className="w-6" />
							<p>{link.name}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
