import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import {sign} from "jsonwebtoken";

export default async function handler(request: NextApiRequest, response: NextApiResponse){
    if (request.method !== "POST") return response.status(405).end();

    // const {id} = request.body;
    const secret = process.env.JWT_SECRET as string;
    const id = sign(request.body.id, secret);

    const serialized = serialize("profile", id, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 1, //5 days
        path: "/",
        secure: process.env.NODE_ENV === "production"
    })

    response.status(200).setHeader("Set-Cookie", serialized).end();
}