import { Request, Response, Router } from "express";
import { body, header } from "express-validator";
import { validationHandler } from "../validation";
import { createClient } from "redis";
import { promisifyAll } from "bluebird";
import { json, urlencoded } from "body-parser";
import UIDGenerator from "uid-generator";
import { isLogged } from '../isLogged'
import {User} from '../user'


const router = Router();
const client: any = promisifyAll(createClient());
const uidgen = new UIDGenerator();

router.use(json());
router.use(urlencoded({ extended: true }));

router.post(
    "/register",
    body('email').isEmail().trim(),
    body('username').isString().trim(),
    body('password').isString().trim(),
    validationHandler,
    async ({ body: {name, surname, username, email, password, country, city, unit } }: Request, res: Response) => {
        if (
            await client.setAsync(
                email,
                JSON.stringify( new User(name, surname, username, email, password, country, city, unit)),
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
