import { useCallback, useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { MdArrowDropDown } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import AccountMenu from "./AccountMenu";
import useCurrentUser from "@/hooks/useCurrentUser";
import useCurrentProfile from "@/hooks/useCurrentProfile";

const TOP_OFFSET = 66;

const Navbar = () => {
    const {user} = useCurrentUser();
    const profiles = user?.profiles;
    const {profile: currentProfile} = useCurrentProfile();

    const otherProfiles = profiles?.filter((profile)=>{
        return profile.id != currentProfile?.id;
    });

    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [accountMenuVisible, setAccountMenuVisible] = useState(false);
    const [showBackgound, setShowBackground] = useState(false);


    useEffect(() =>{
        const handleScroll = () =>{
            if(window.scrollY >= TOP_OFFSET){
                setShowBackground(true);
            }else{
                setShowBackground(false);
            }
        }
        window.addEventListener("scroll", handleScroll);

        return () =>{
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    const toggleMobileMenu = useCallback(() => {
        setMobileMenuVisible((current)=> !current);
    }, []);
    const toggleAccountMenu = useCallback(() => {
    setAccountMenuVisible((current)=> !current);
    }, []);
    
    return (
        <nav className="w-full fixed z-40">
            <div 
                className={`
                    px-4
                    md:px-16
                    py-6
                    flex
                    flex-row
                    items-center
                    transition
                    duration-500
                    ${showBackgound? 'bg-zinc-900 bg-opacity-90' : ''}
            `}
            >
          {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.svg" alt="Logo" className="h-4 lg:h-7"/>

            <div 
            className="
                flex-row
                ml-8
                gap-7
                hidden
                lg:flex
            "
            >
                <NavbarItem  label="Home"/>
                <NavbarItem  label="TV Shows"/>
                <NavbarItem  label="Movies"/>
                <NavbarItem  label="New & Popular"/>
                <NavbarItem  label="My List"/>
                <NavbarItem  label="Browse by Languages"/>
            </div>
            <div onClick={toggleMobileMenu} onMouseEnter={()=>setMobileMenuVisible(true)} onMouseLeave={() =>setMobileMenuVisible(false)} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                <p className="text-white text-sm">Browse</p>
                <MdArrowDropDown className={`text-white transition w-6 h-6 ${mobileMenuVisible? 'rotate-180' : "rotate-0"}`}/>

                <MobileMenu visible={mobileMenuVisible}/>
            </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                    <IoSearch className="h-6 w-6"/>
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                    <FaRegBell className="h-5 w-5"/>
                    </div>
                    <div onClick={toggleAccountMenu} onMouseEnter={()=>setAccountMenuVisible(true)} onMouseLeave={() =>setAccountMenuVisible(false)} className="flex flex-row items-center gap-2 cursor-pointer relative">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-md overflow-hidden">
                        <img src={`/images/profiles/${currentProfile?.profilePic}.png`} alt={currentProfile?.name}/>
                    </div>
                        <MdArrowDropDown className={`text-white transition w-6 h-6 ${accountMenuVisible? 'rotate-180' : "rotate-0"}`}/>
                        <AccountMenu visible={accountMenuVisible} profiles={otherProfiles}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;