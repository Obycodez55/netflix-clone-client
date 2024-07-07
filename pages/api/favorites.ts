import baseUrl from "@/Utils";
import axios from "axios";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const token = request.cookies.token;
    const profile = request.cookies.profile!;
    const profileId = verify(profile, process.env.JWT_SECRET!);
    const {movieId} = request.body;
    let data: any;
 
    // if(request.method === "GET"){
    //     ({data} = await axios.get(`${baseUrl}/mylist/${profileId}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }));    
    // }
    // else 
 if (request.method === "POST") {
        ({data} = await axios.post(`${baseUrl}/mylist/${profileId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                movieId
            }
        }));
    } else if (request.method === "DELETE"){
        ({data} = await axios.delete(`${baseUrl}/mylist/${profileId}/${movieId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                movieId
            }
        }));
        response.status(200).send(data);
    } else {
        return response.status(405).end();
    }
    
   return response.status(200).send(data);
} catch (error) {
    console.log(error);
    return response.status(500).end();
}
}
