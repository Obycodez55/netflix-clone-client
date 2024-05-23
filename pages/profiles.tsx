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
    return (
      
      <>
      
        <div className="flex items-center h-full justify-center">
           <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
        <div className="lg:flex grid md:grid-cols-3 grid-cols-2 items-center justify-center md:gap-8 gap-0 mt-10">
           
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
           </div>
        </div>
        </>
    )
}

export default Profiles;