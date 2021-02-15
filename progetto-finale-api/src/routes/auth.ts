import { Request, Response, Router } from "express";
import { param, query, header } from "express-validator";
import { validationHandler } from "../validation";
import { createClient } from "redis";
import { promisifyAll } from "bluebird";
import { json, urlencoded } from "body-parser";
import UIDGenerator from "uid-generator";

const router = Router();
const client: any = promisifyAll(createClient());
const uidgen = new UIDGenerator();

router.use(json())
router.use(urlencoded({extended: true}))

router.post("/register", async ({body: { email, username, password }}: Request, res: Response) => {
    if(await client.setAsync(email, JSON.stringify({email, username, password}), "NX")) {
        res.status(201).json(JSON.parse(await client.getAsync(email)))
    } else {
        res.status(400).json({Error: "Mail already exist"})
    }
});

router.get("/login", async ({headers: {email, password}}: Request, res: Response) => {
    if (await client.existsAsync(email)) {
        const userInfo = JSON.parse(await client.getAsync(email));
        if(password === userInfo.password){
            var token = uidgen.generateSync();
            await client.setAsync(token, email, "EX", 120);
            res.status(200).json({message: "Utente loggato", username: userInfo.username, token});
        }
    }
});

router.delete("/logout", async ({headers: {email, token}}: Request, res: Response) => {
    if(await client.existsAsync(token) && await client.getAsync(token) === email){
        client.del(token);
        res.status(200).json({message: "logout eseguito"})
    } else {
        res.status(400).json({message: "utente non loggato, impossibile eseguire logout"})
    }
});

export { router as auth };
