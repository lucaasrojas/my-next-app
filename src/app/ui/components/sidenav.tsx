'use client'
import Link from "next/link"
import { HomeIcon, KeyIcon } from "@heroicons/react/24/outline"

const links = [
    {name: 'Home', href: '/', icon: HomeIcon},
    {name: 'Login', href: '/login', icon: KeyIcon},
]

export default function Sidenav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-200">
            <div className="flex grow flex-row justify-between md:flex-col ">
                {links.map(link =>{
                    return (
                        <Link key={link.name} href={link.href} className="flex items-center space-x-2 bg-gray-300 hover:bg-gray-400">
                            <p>{link.name}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}