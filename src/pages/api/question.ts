import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(request: NextApiRequest, response: NextApiResponse) => {
    if(request.method !== "POST") {
        return response.status(405).json({message: "Mehtod Not Allow"})
    }

    const data = request.body

    return response.status(200).json({message: "sucess", ...data})
}