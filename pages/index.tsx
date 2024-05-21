import axios from "axios";
import {parse} from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const req  = context.req as IncomingMessage;
  const token = req.headers.cookie? parse(req.headers.cookie).token : undefined;
  console.log(token);
  if(!token) return {
        redirect: {
          destination: "/auth",
          permanent: false
        }
      }
      const profile = req.headers.cookie? parse(req.headers.cookie).profile : undefined;
      if(!profile) return {
        redirect: {
          destination: "/profiles",
          permanent: false
        }
      }
  return {
    props: {
      token
    }
  }
}

export default function Home() {
  const { data: user} = useCurrentUser();
  const {push} = useRouter();
  const logout = useCallback(async()=>{
    try {
    await axios.delete(`api/logout`);
      push("/auth");
  } catch (error:unknown) {
      console.log(error);
}}, [push])

  return (
    <>
    <h1 className="text-4xl text-green-500">Netflix clone</h1>
    <p className="text-white">Logged In as : {user?.username}</p>
    <button className="h-10 w-full bg-white hover:bg-neutral-400" onClick={logout}>
      Logout!
    </button>
    </>
  );
}
