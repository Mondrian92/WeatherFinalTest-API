import { Request, Response, NextFunction } from "express";
import { createClient } from "redis";
import { promisifyAll } from "bluebird";
const client: any = promisifyAll(createClient());

const isLogged = async ({ headers: { token } }: Request, res: Response, next: NextFunction) => {
    const email = await client.getAsync(token);
    res.locals.emails = email;
    if(email) next()
    else res.status(401).json({
        message: "Utente non autenticato",
        user:{
            name: "",
            surname: "",
            username: "",
            email: "",
            password: "",
            unit: ""
        },
        token: "",
        error: "",
        isLogged: false 
    })
}

export { isLogged }