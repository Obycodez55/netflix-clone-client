import axios from "axios";
import {parse} from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";

export async function getServerSideProps(context: NextPageContext) {
  const req  = context.req as IncomingMessage;
  const token = req.headers.cookie? parse(req.headers.cookie).token : undefined;
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

  return (
    <>
   <Navbar/>
    </>
  );
}
