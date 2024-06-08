import useCurrentUser from "@/hooks/useCurrentUser";
import { parse } from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";
import Profile from '../components/Profile';
import { ProfileA, User } from "..";
import AddNewProfile from "@/components/AddNewProfile";

export async function getServerSideProps(context: NextPageContext) {
    const req  = context.req as IncomingMessage;
    const token = req.headers.cookie? parse(req.headers.cookie).token : undefined;
    if(!token) return {
          redirect: {
            destination: "/auth",
            permanent: false
          }
        }
    return {
      props: {
        token
      }
    }
  }

const Profiles = () =>{

    const {user} = useCurrentUser();
  const profiles = user?.profiles;
  // console.log(profiles);
    return (
      
      <>
      
        <div className="flex items-center h-full justify-center">
           <div className="flex flex-col">
        {/*  eslint-disable-next-line react/no-unescaped-entities */}
        <h1 className="text-3xl md:text-5xl text-white text-center"> Who's watching?</h1>
        <div className="lg:flex grid md:grid-cols-3 grid-cols-2 items-center justify-center md:gap-6 gap-0 mt-10">
           
           {profiles?.map((profile : ProfileA, index) => {
        return (
          <Profile
            key={index}
            id={profile.id}
            name={profile.name}
            color={profile.profilePic}
          />
        );
      })}
    
          {profiles?.length <5 && <AddNewProfile/>}
        </div>  
        <div className="text-center mt-16">
          <span className="border-2 border-gray-500 hover:border-gray-300 py-1 px-6 text-gray-500 text-xl hover:text-gray-300  cursor-pointer">
          Manage Profiles
          </span>
        </div>
        <div className="text-center mt-16">
          <span className="border-2 border-gray-500 hover:border-gray-300 py-1 px-6 text-gray-500 text-xl hover:text-gray-300  cursor-pointer">
          Manage Profiles
          </span>
        </div>
           </div>
        </div>
        </>
    )
} 

export default Profiles;