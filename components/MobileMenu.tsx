import Link from "next/link";
import React from "react";

interface MobileMenuProps {
    visible? : boolean
}

const mobileMenuOptions = [
    {name: "Home", href: "/", as: "/"},
    {name: "TV Shows", href: "/?series=%%", as: "/tvshows"},
    {name: "Movies", href:"/?movies=%%", as:"movies"},
    {name: "New & Popular", href:"/?popular=%%", as:"/new"},
    {name: "My List", href:"/mylist=", as:"/mylist"},
    {name: "Browse by Language", href:"/", as:"/browse"}
]

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
    if (!visible){
        return null
    }

    return (
        <div className="bg-black w-56 flex-col border-gray-800 flex py-5 rounded-lg">
            <div className="flex flex-col gap-4">
                {mobileMenuOptions.map(({name, href, as})=>(
                    <Link key={name} href={href} as={as}>
                    <div className="px-3 text-center text-white hover:underline">
                        {name}
                    </div>
                </Link>
                ))}
            </div>
           
        </div>
    )
}

export default MobileMenu;