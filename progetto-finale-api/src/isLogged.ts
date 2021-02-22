import { Request, Response, NextFunction } from "express";
import { createClient } from "redis";
import { promisifyAll } from "bluebird";
const client: any = promisifyAll(createClient());

const isLogged = async ({ headers: { token } }: Request, res: Response, next: NextFunction) => {
    try{
    const email = await client.getAsync(token);
    res.locals.emails = email;
    if(email) next()
    else res.status(401).json({
        message: "Utente non autorizzato",
        isLogged: false 
    })
    }catch(error){
        console.log(token)
        console.log(error)
    }
}

export { isLogged }