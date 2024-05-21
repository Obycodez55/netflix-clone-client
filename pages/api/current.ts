import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(request: NextApiRequest, response: NextApiResponse){
    if (request.method !== "GET") return response.status(405).end();
    
    const token = request.cookies.token;
    console.log(token)
    response.status(200).json({token});
}