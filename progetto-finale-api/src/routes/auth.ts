import { Request, Response, Router } from "express";
import { body, header } from "express-validator";
import { validationHandler } from "../validation";
import { createClient } from "redis";
import { promisifyAll } from "bluebird";
import { json, urlencoded } from "body-parser";
import { isLogged } from "../isLogged"
import {User} from "../user"
import cors from "cors"
import UIDGenerator from "uid-generator";

const router = Router();

router.use(cors());
router.use(json());
router.use(urlencoded({ extended: true }));
const client: any = promisifyAll(createClient());
const uidgen = new UIDGenerator();



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
        if (await client.setAsync(email, JSON.stringify(user), "NX")) {
          res.status(201).json({ message: "Utente registrato" });
        } else {
          res.status(400).json({ error: "Mail already exist" });
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
            const {password,city,unit,country} = JSON.parse(await client.getAsync(email));
            if (password === password) {
                var token = uidgen.generateSync();
                await client.setAsync(token, email, "EX", 120);
                res.status(200).json({
                    message: "Login eseguito",
                    token,
                    city,
                    country,
                    unit,
                    isLogged: true 
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
        res.status(200).json({
        message: "Logout eseguito",
        isLogged: false 
    });
    }
);

router.get('/checkLogin',isLogged, async ( _ : Request, res: Response) => {
    res.status(200).json({
        message: "Login eseguito",
        isLogged: true 
    })
})

export { router as auth };
