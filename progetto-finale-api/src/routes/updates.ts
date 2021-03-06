import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validationHandler } from "../validation";
import { createClient } from "redis";
import { promisifyAll } from "bluebird";
import { isLogged } from '../isLogged'
import { User } from '../user'
import cors from "cors";
import bodyParser from "body-parser"


const router = Router();
const client: any = promisifyAll(createClient());
router.use(cors())
router.use(bodyParser.urlencoded())
router.use(bodyParser.json())

router.put("/username", 
    isLogged, 
    body('username').isString().trim(), 
    validationHandler, 
    async ({ body:{ username } }: Request, res: Response) => {
    if (await client.existsAsync(res.locals.emails)) {
        const userInfo = JSON.parse(await client.getAsync(res.locals.emails));
        userInfo.username = username
        const user: User = {...userInfo}
        if (
            await client.setAsync( res.locals.emails, JSON.stringify( user ))
        )
        res.status(200).json({Message: "Update fatto", user: userInfo})
    } else {
        res.status(400).json({Message: "Bad request"})
    }
});

router.put("/city", 
    isLogged, 
    body('city').isString().trim(), 
    validationHandler, 
    async ({ body: {city} }: Request, res: Response) => {
    if (await client.existsAsync(res.locals.emails)) {  
        const userInfo = JSON.parse(await client.getAsync(res.locals.emails));        
        userInfo.city = city
        const user: User = {...userInfo}
        if (
            await client.setAsync( res.locals.emails, JSON.stringify( user ))
        )
        res.status(200).json({message: "Update fatto"})
    } else {
        res.status(400).json({error: "Bad request"})
    }
});

router.put("/country", 
    isLogged, 
    body("country").isString().isLength({ min: 2, max: 2 }), 
    validationHandler, 
    async ({ body: { country } }: Request, res: Response) => {
    if (await client.existsAsync(res.locals.emails)) {
        const userInfo = JSON.parse(await client.getAsync(res.locals.emails));
        userInfo.country = country
        const user: User = {...userInfo}
        if (
            await client.setAsync( res.locals.emails, JSON.stringify( user ))
        )
        res.status(200).json({message: "Update fatto"})
    } else {
        res.status(400).json({error: "Bad request"})
    }
});

router.put("/unit", 
    isLogged, 
    body("unit").custom( ( value ) => value != 'metric' || value != 'imperial' || value != 'standard'),
    validationHandler, 
    async ({ body: { unit } }: Request, res: Response) => {
    if (await client.existsAsync(res.locals.emails)) {
        const userInfo = JSON.parse(await client.getAsync(res.locals.emails));
        userInfo.unit = unit
        const user: User = {...userInfo}
        if (
            await client.setAsync( res.locals.emails, JSON.stringify( user ))
        )
        res.status(200).json({message: "Update fatto"})
    } else {
        res.status(400).json({error: "Bad request"})  
    }
});


export {router as updates} 