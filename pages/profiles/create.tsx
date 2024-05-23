import Input from "@/components/Input";
import useCurrentUser from "@/hooks/useCurrentUser";
import { User } from "@/index";
import baseUrl from "@/Utils";
import axios, { AxiosError } from "axios";
import { parse } from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

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

const CreateProfile = ({token}: {token: string}) =>{
    const {user} = useCurrentUser("../api/currentUser");
  const profiles = user?.profiles;


    const router = useRouter();
const [name, setName] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [buttonText, setButtontext] = useState("Create New");


const addProfile = useCallback(async()=>{
    setErrorMessage("");
    try {
        setButtontext("Loading...")
        await axios.post(`${baseUrl}/users/createProfile`, {
            name
        },
          {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        router.push("/profiles");
    } catch (error:unknown) {
        if(error instanceof AxiosError){
            error.status !== 500 && error.response ? setErrorMessage(error.response.data.message) : setErrorMessage("Internal Server Error! Try again");
        }
        setButtontext("Create New");
    }
}, [router, token, name])

const handleChange = useCallback((event : any)=>{
    setErrorMessage("");
    const value = event.target.value;
    setName(value);
    const existingProfile = profiles.filter((profile) =>{
        return profile.name.toLowerCase() == value.toLowerCase();
    });
    if(existingProfile.length !== 0 ) setErrorMessage("Name has been used, Try again!");
}, [profiles])
    return (
      <>

            <div className="bg-black w-full h-full lg:bg-opacity-50">
            <nav className="px-12 py-5 flex gap-8 items-center">
                     <FaArrowLeft onClick={() => router.back()} className="text-neutral-400 w-10 h-10"/>
           
            <div className="flex max-md:items-center max-md:justify-center">
            <img src="/images/logo.svg" alt="Logo" className="h-12" />
            </div>

            </nav>
            <div className="flex justify-center">
        <div className="bg-black bg-opacity-70 p-16 lg:pb-10 self-center mt-12 lg:w-2/5 lg:max-w-md rounded-md w-full lg:">
            <h2 className="text-white text-4xl mb-8 font-semibold">
                Add Profile
            </h2>
            <div className="flex flex-col gap-4">
                 <Input
            label="Name"
            onChange={handleChange}
            id="name"
            type="text"
            value={name}
            />
    
            </div>
            <button onClick={addProfile} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                {buttonText}
            </button>
            {errorMessage && (
            <p className="text-red-600 mt-4 justify-center">
                {errorMessage}
            </p>
            )
            }
        </div>
            </div>
            </div>
      </>
     
    )
}

export default CreateProfile;