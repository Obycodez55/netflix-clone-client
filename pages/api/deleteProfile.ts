import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(request: NextApiRequest, response: NextApiResponse){
    if (request.method !== "DELETE") return response.status(405).end();

    const serialized = serialize("profile", "", {
        httpOnly: true,
        sameSite: "strict",
        maxAge: -1,             //Instant
        path: "/",
        secure: process.env.NODE_ENV === "production"
    })

    response.status(200).setHeader("Set-Cookie", serialized).end();
}