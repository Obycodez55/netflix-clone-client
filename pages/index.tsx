import axios from "axios";
import {parse} from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";

export async function getServerSideProps(context: NextPageContext) {
  const req  = context.req as IncomingMessage;
  const token = req.headers.cookie? parse(req.headers.cookie) : undefined;
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

export default function Home() {
  const {push} = useRouter();
  const logout = useCallback(async()=>{
    try {
    await axios.delete(`api/logout`);
      push("/auth");
  } catch (error:unknown) {
      console.log(error);
}}, [push])

const getToken = useCallback(async()=>{
  try {
  const {data} = await axios.get(`api/current`);
  console.log(data? data: "NO data");
} catch (error:unknown) {
    console.log(error);
}}, [])
  return (
    <>
    <h1 className="text-4xl text-green-500">Netflix clone</h1>
    <button className="h-10 w-full bg-white hover:bg-neutral-400" onClick={logout}>
      Logout!
    </button>
    </>
  );
}
