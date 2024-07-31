import baseUrl from "@/Utils";
import axios from "axios";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(request: NextApiRequest, response: NextApiResponse){
    if (request.method !== "GET") return response.status(405).end();
    try {
        const token = request.cookies.token;
        const profile = request.cookies.profile!;
        const profileId = verify(profile, process.env.JWT_SECRET!);
        const text = request.query.text;
        const {data} = await axios.get(`${baseUrl}/movies/search?text=${text}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                profileId
            }
        });
       return response.status(200).send(data);
    } catch (error) {
        console.log(error);
        return response.status(500).end();
    }
   
}