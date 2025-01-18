"use client";
import { HomeIcon, KeyIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import supabase from "@/app/utils/supabase";
import { useEffect } from "react";
import useUserStore from "@/store/userStore";
import SideNavItem from "./SideNavItem";

const links = [
	{ name: "Home", href: "/", icon: HomeIcon },
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
			supabase.auth.getUser().then((user) => {
				if (user.data.user) {
					userStore.setUser(user?.data?.user);
				}
			});
		}
		// eslint-disable-next-line
	}, [userStore.user]);

	return (
		<div className="flex w-full shadow-md">
			<div className="flex grow flex-row md:flex-col gap-2 p-2">
				{links.map((link) => <SideNavItem key={link.name} {...link} currentPath={path} show={link.role === "authenticated" ? !!userStore.user : true} />)}
				{userStore.user ? (
					<button
						onClick={() =>
							supabase.auth.signOut().then(() => {
								userStore.setUser(null);
								router.replace("/");
							})
						}
						className={`flex gap-2 items-center bg-white hover:border-solid hover:border-b-2 hover:border-slate-300  p-2 rounded-lg`}
					>
						{" "}
						Log Out{" "}
					</button>
				) : (
					<SideNavItem
						name="Login"
						href="/login"
						currentPath={path}
						icon={KeyIcon}
					/>
				)}
			</div>
		</div>
	);
}
