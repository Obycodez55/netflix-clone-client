import baseUrl from "@/Utils";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(request: NextApiRequest, response: NextApiResponse){
    if (request.method !== "GET") return response.status(405).end();
    try {
        const token = request.cookies.token;
        const {data} = await axios.get(`${baseUrl}/users/findOne`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
       return response.status(200).send(data);
    } catch (error) {
        console.log(error);
        return response.status(405).end();
    }
   
}