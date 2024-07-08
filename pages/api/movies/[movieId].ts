import baseUrl from "@/Utils";
import axios from "axios";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(request: NextApiRequest, response: NextApiResponse){
    if (request.method !== "GET") return response.status(405).end();
    try {
        const token = request.cookies.token;
        const movieId = request.query.movieId;
        if (!movieId) return response.status(400).end();
        if (typeof movieId !== "string") return response.status(400).end();
        const {data} = await axios.get(`${baseUrl}/movies/${movieId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
       return response.status(200).send(data);
    } catch (error) {
        console.log(error);
        return response.status(500).end();
    }
   
}