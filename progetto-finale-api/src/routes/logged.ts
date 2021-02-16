import { isLogged } from '../isLogged'
import { Request, Response, Router } from "express";
const router = Router();

router.get('/', isLogged, async ( _ : Request, res: Response) => {
    res.status(200).json({isLogged: true})
})

export {router as checkLogin} 