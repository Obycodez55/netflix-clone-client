import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import baseUrl from "@/Utils";
import { useRouter } from "next/router";

const Auth = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [buttonText, setButtontext] = useState("Sign in")
    const [errorMessage, setErrorMessage] = useState("");

    const [variant, setVariant] = useState("login");

    const toggleVariant = useCallback(()=>{
        setErrorMessage("");
        setVariant((currentVariant)=> currentVariant=== "login"? "register" : "login");
        setButtontext(variant === "login"? "Register" : "Sign in");
    }, [variant])

    const auth = useCallback(async()=>{
        setErrorMessage("");
        try {
            setButtontext("Loading...")
            const {data} = await axios.post(`${baseUrl}/auth/${variant}`, {
                email,
                username,
                password
            });
            await axios.post("api/setToken", data);
            router.push("/profiles");
        } catch (error:unknown) {
            setEmail(""); setUserName(""); setPassword(""); 
            if(error instanceof AxiosError){
                error.status !== 500 && error.response ? setErrorMessage(error.response.data.message) : setErrorMessage("Internal Server Error! Try again");
            }
            setButtontext(variant === "login"? "Sign in" : "Register");
        }
    }, [email, username, password, variant, router])
    
    return(
        
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
           
         <div className="bg-black w-full h-full lg:bg-opacity-50">
            <nav className="px-12 py-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.svg" alt="Logo" className="h-12" />

            </nav>
            <div className="flex justify-center">
        <div className="bg-black bg-opacity-70 p-16 lg:pb-10 self-center mt-12 lg:w-2/5 lg:max-w-md rounded-md w-full lg:">
            <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === "login"? "Sign in" : "Register"}
            </h2>
            <form action="" onSubmit={auth}>
            <div className="flex flex-col gap-4">
                {variant === "register" &&(
            <Input
            label="Username"
            onChange={(event: any)=>setUserName(event.target.value)}
            id="name"
            type="text"
            value={username}
            />
        )}
            <Input
            label="Email"
            onChange={(event: any)=>setEmail(event.target.value)}
            id="email"
            type="email"
            value={email}
            />
            <Input
            label="Password"
            onChange={(event: any)=>setPassword(event.target.value)}
            id="password"
            type="password"
            value={password}
            />
            </div>
            <button onClick={auth} type="submit" onSubmit={auth} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                {buttonText}
            </button>
            </form>
            {errorMessage && (
            <p className="text-red-600 mt-4 justify-center">
                {errorMessage}
            </p>
            )
            }
            <p className="text-neutral-500 mt-12 lg:mt-10">
            {variant==="login"? "First time using Netflix?":"Already have an account?"}
                <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                    {variant==="login"? "Create an account":"login"}
                </span>
            </p>
        </div>
            </div>
            </div>   
        </div>
    )
}

export default Auth;