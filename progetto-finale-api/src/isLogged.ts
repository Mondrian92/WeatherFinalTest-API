import { Request, Response, NextFunction } from "express";
import { createClient } from "redis";
import { promisifyAll } from "bluebird";
const client: any = promisifyAll(createClient());

const isLogged = async ({ headers: { token } }: Request, res: Response, next: NextFunction)  =>{
    const email = await client.getAsync(token);
    res.locals.emails = email; // Cant remember this
    if(email) next()
    else res.status(401).json({mesage: "User not logged"})
}

export { isLogged }