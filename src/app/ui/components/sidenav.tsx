"use client";
import Link from "next/link";
import { HomeIcon, KeyIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import supabase from "@/app/utils/supabase";
import { useEffect } from "react";
import useUserStore from "@/store/userStore";

const links = [
	{ name: "Home", href: "/", icon: HomeIcon },
	{ name: "Login", href: "/login", icon: KeyIcon },
	{
		name: "Create Item",
		href: "/item/create",
		icon: KeyIcon,
		role: "authenticated",
	},
];

export default function Sidenav() {
	const path = usePathname();
	const router = useRouter();
	const userStore = useUserStore((state) => state);

	useEffect(() => {
		if (!userStore.user) {
			supabase.auth
				.getUser()
				.then((user) => userStore.setUser(user.data.user));
		}
	}, [userStore.user]);

	return (
		<div className="flex w-full bg-sky-50 p-4">
			<div className="flex grow flex-row md:flex-col gap-2 ">
				{links.map((link) => {
					const LinkIcon = link.icon;
					if (link.role && link.role !== userStore.user?.aud) return;
					return (
						<Link
							key={link.name}
							href={link.href}
							className={`flex gap-2 items-center bg-white hover:bg-sky-300 border-solid border-2 border-sky-300 p-2 rounded-lg ${
								path === link.href ? "bg-sky-300" : ""
							}`}
						>
							<LinkIcon className="w-6" />
							<p>{link.name}</p>
						</Link>
					);
				})}
				{userStore.user && (
					<button
						onClick={() =>
							supabase.auth
								.signOut()
								.then(() => {
									userStore.setUser(null);
									router.replace('/')
								})
						}
						className="flex gap-2 items-center bg-white hover:bg-sky-300 border-solid border-2 border-sky-300 p-2 rounded-lg"
					>
						{" "}
						Log Out{" "}
					</button>
				)}
			</div>
		</div>
	);
}
