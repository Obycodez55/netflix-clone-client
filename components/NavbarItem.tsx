import Link from "next/link";
import React from "react";

interface NavbarItemProps{
    label: string
    href: string
    as: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({label, href, as})=>{
    return (
        <Link href={href} as={as}>
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {label}
        </div>
        </Link>
    )
}

export default NavbarItem;