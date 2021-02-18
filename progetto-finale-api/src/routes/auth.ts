import { Request, Response, Router } from "express";
import { body, header } from "express-validator";
import { validationHandler } from "../validation";
import cors from "cors"
import { createClient } from "redis";
import { promisifyAll } from "bluebird";
import { json, urlencoded } from "body-parser";
import { isLogged } from "../isLogged"
import {User} from "../user"
import UIDGenerator from "uid-generator";
const router = Router();
// const options: cors.CorsOptions = {
//     allowedHeaders: [
//       'Origin',
//       'X-Requested-With',
//       'Content-Type',
//       'Accept',
//       'X-Access-Token',
//       '*'
//     ],
//     credentials: true,
//     methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
//     origin: 'http://localhost:4200',
//     preflightContinue: false,
//   };

router.use(cors());

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
const client: any = promisifyAll(createClient());
const uidgen = new UIDGenerator();

router.use(json());
router.use(urlencoded({ extended: true }));

router.post(
    "/register",
    body('name').isString().trim(),
    body('surname').isString().trim(),
    body('username').isString().trim(),
    body('email').isEmail().trim(),
    body('password').isString().trim(),
    body("country").isString().isLength({ min: 2, max: 2 }),
    body("unit").custom( ( value ) => value != 'metric' || value != 'imperial' || value != 'standard'),
    validationHandler,
    async ({ body: {name, surname, username, email, password, country, city, unit } }: Request, res: Response) => {
        const user: User = {name, surname, username, email, password, country, city, unit}
        if ( 
            await client.setAsync(
                email,
                JSON.stringify( user ),
                "NX"
            )
        ) {
            res.status(201).json(JSON.parse(await client.getAsync(email)));
        } else {
            res.status(400).json({ Error: "Mail already exist" });
        }
    }
);

router.get(
    "/login",
    header("email").isEmail().trim(),
    header("password").isString().trim(),
    validationHandler,
    async ({ headers: { email, password } }: Request, res: Response) => {
        if (await client.existsAsync(email)) {
            const userInfo = JSON.parse(await client.getAsync(email));
            if (password === userInfo.password) {
                var token = uidgen.generateSync();
                await client.setAsync(token, email, "EX", 120);
                res.status(200).json({
                    message: "Utente loggato",
                    username: userInfo.username,
                    token,
                });
            }
        }
    }
);

router.delete(
    "/logout",
    isLogged,
    header("token").isString(),
    validationHandler,
    async ({ headers: { token } }: Request, res: Response) => {
        client.del(token);
        res.status(200).json({ message: "logout eseguito" });
    }
);

export { router as auth };
